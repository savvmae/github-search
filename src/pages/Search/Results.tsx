import React, { ReactElement, useState, useEffect, SyntheticEvent } from 'react'
import { useHistory } from 'react-router'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { RootState } from '../../store'

import { setDetailItem } from '../../redux/actions'
import {
  getSortedByStars,
  getAvailableLanguages,
  getFilteredByLanguageList
} from './helpers'
import {
  Item,
  ContentContainer,
  Name,
  Description,
  ListOptions,
  Select,
  SelectLabel,
  SortWrapper
} from './subcomponents'

const SORT_BY = {
  bestMatch: 'BEST_MATCH',
  stars: 'STARS'
}

const NO_FILTER = 'no-filter'

const Results = (): ReactElement => {
  const { searchList } = useSelector(
    (state: RootState) => ({
      searchList: state.searchList
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
    setLanguages(getAvailableLanguages(searchList))
  }, [searchList])

  useEffect(() => {
    let sortedList = searchList
    if (sortBy === SORT_BY.stars) {
      sortedList = getSortedByStars(searchList)
    }
    if (filteredLanguage !== NO_FILTER) {
      sortedList = getFilteredByLanguageList(sortedList, filteredLanguage)
    }
    setSortedList([...sortedList])
  }, [filteredLanguage, searchList, sortBy])

    return (
      <ContentContainer>
        <ListOptions>
          <SortWrapper>
            <SelectLabel htmlFor="list-sort">Sort By: </SelectLabel>
            <Select
              name="sort"
              id="list-sort"
              onChange={(e: SyntheticEvent<HTMLSelectElement>) =>
                setSortBy(e.currentTarget.value)
              }
            >
              <option value={SORT_BY.bestMatch}>Best Match (Default)</option>
              <option value={SORT_BY.stars}>Number of Stars</option>
            </Select>
          </SortWrapper>
          <div>
            <SelectLabel htmlFor="language-filter">Language: </SelectLabel>
            <Select
              name="filter"
              id="language-filter"
              onChange={(e: SyntheticEvent<HTMLSelectElement>) =>
                setFilteredLanguage(e.currentTarget.value)
              }
            >
              <option value={NO_FILTER}>No language selected</option>
              {languages.map((language) => {
                return (
                  <option key={language} value={language}>
                    {language}
                  </option>
                )
              })}
            </Select>
          </div>
        </ListOptions>
        {sortedList.map((item: any) => {
          return (
            <Item key={item.id}>
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

export default Results
