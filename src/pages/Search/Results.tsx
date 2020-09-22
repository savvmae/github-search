import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import Loader from './Loader'
import { setDetailItem } from '../../redux/actions'

const Item = styled.div`
  border-bottom: 1px solid gray;
  padding: 12px 12px 0;
`

const SearchList = styled.div`
  margin-top: 30px;
`

const Name = styled.button`
  font-weight: 600;
  font-size: 18px;
  border: none;
  background-color: inherit;
  color: #34657F;
  margin: 0;
  padding: 0;
`

const Description = styled.p`
  margin: 12px 0;
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

  const handleSetDetail = (item: any) => {
    dispatch(setDetailItem(item))
    history.push('/detail')
  }

  if (isLoading) {
    return <Loader />
  }

  if (searchList.length) {
    return (
      <SearchList>
        {searchList.map((item: any, index: number) => {
          return (
            <Item key={`${index + 1}`}>
              <Name onClick={() => handleSetDetail(item)}>{item.full_name}</Name>
              <Description>{item.description}</Description>
            </Item>
          )
        })}
      </SearchList>
    )
  }

  return <></>
}

export default Results
