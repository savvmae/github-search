import React, { ReactElement, useState, useEffect, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import Loader from './Loader'
import { setDetailItem } from '../../redux/actions'
import getSortedByStars from './getSortedByStars'

const SORT_BY = {
  bestMatch: 'BEST_MATCH',
  stars: 'STARS'
}

const NO_FILTER = 'no-filter'

const Item = styled.div`
  border-bottom: 1px solid gray;
  padding-top: 12px;
`

const ContentContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  padding: 0 12px;
`

const Name = styled.button`
  font-weight: 600;
  font-size: 18px;
  border: none;
  background-color: inherit;
  color: #34657f;
  margin: 0;
  padding: 0;
`

const Description = styled.p`
  margin: 12px 0;
`

const ListOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Results = (): ReactElement => {
  const { searchList, isLoading } = useSelector(
    (state: RootState) => ({
      searchList: state.searchList,
      isLoading: state.isLoading
    }),
    shallowEqual
  )

  const history = useHistory()
  const dispatch = useDispatch()

  const [languages, setLanguages] = useState<any[]>([])
  const [filteredLanguage, setFilteredLanguage] = useState(NO_FILTER)
  const [sortedList, setSortedList] = useState(searchList)
  const [sortBy, setSortBy] = useState(SORT_BY.bestMatch)

  const handleSetDetail = (item: any) => {
    dispatch(setDetailItem(item))
    history.push('/detail')
  }

  useEffect(() => {
    const languages = Array.from(
      new Set(searchList.map((item: any) => item.language).filter(Boolean))
    )
    setLanguages(languages)
  }, [searchList])

  useEffect(() => {
    let sortedList = searchList
    if (sortBy === SORT_BY.stars) {
      sortedList = getSortedByStars(searchList)
    }
    if (filteredLanguage !== NO_FILTER) {
      sortedList = [...sortedList].filter(
        (item) => item.language === filteredLanguage
      )
    }
    setSortedList([...sortedList])
  }, [filteredLanguage, searchList, sortBy])

  if (isLoading) {
    return <Loader />
  }

  if (sortedList.length) {
    return (
      <ContentContainer>
        <ListOptions>
          <div>
            <label htmlFor="list-sort">Sort By: </label>
            <select
              name="sort"
              id="list-sort"
              onChange={(e: SyntheticEvent<HTMLSelectElement>) =>
                setSortBy(e.currentTarget.value)
              }
            >
              <option value={SORT_BY.bestMatch}>Best Match (Default)</option>
              <option value={SORT_BY.stars}>Number of Stars</option>
            </select>
          </div>
          <div>
            <label htmlFor="language-filter">Language: </label>
            <select
              name="filter"
              id="language-filter"
              onChange={(e: SyntheticEvent<HTMLSelectElement>) =>
                setFilteredLanguage(e.currentTarget.value)
              }
            >
              <option value={NO_FILTER}>No language selected</option>
              {languages.map((language, index) => {
                return (
                  <option key={`${index + 1}`} value={language}>
                    {language}
                  </option>
                )
              })}
            </select>
          </div>
        </ListOptions>
        {sortedList.map((item: any, index: number) => {
          return (
            <Item key={`${index + 1}`}>
              <Name onClick={() => handleSetDetail(item)}>
                {item.full_name}
              </Name>
              <Description>
                {item.description ?? 'No Description Available'}
              </Description>
            </Item>
          )
        })}
      </ContentContainer>
    )
  }

  return <></>
}

export default Results
