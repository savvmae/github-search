import React, { ReactElement, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { PageContainer, PageHeader, Card } from '../../subcomponents'
import { fetchSearchResults } from '../../redux/actions'
import Results from './Results'

const SearchInput = styled.input`
  padding: 8px;
	width: 200px;
	margin: auto;
	display: block;
	border-radius: 5px;
	border-style: solid;
`

const SubmitButton = styled.button`
	min-width: 120px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-weight: 700;
	margin: 12px auto 0;
	height: 32px;
	text-transform: uppercase;
	background-color: #34657F;
	color: #FFFFFF;
	border: none;
	border-radius: 5px;
`

const Search = (): ReactElement => {
	const dispatch = useDispatch()
  const [searchValue, setSearchValue] = React.useState('')

	const handleSubmit = () => {
		dispatch(fetchSearchResults(searchValue))
	}

  return (
    <PageContainer>
      <Card>
        <PageHeader>Search All GitHub Repositories</PageHeader>
        <SearchInput
          placeholder="Search"
          value={searchValue}
          onChange={(e: SyntheticEvent<HTMLInputElement>) =>
            setSearchValue(e.currentTarget.value)
          }
        />
				<SubmitButton onClick={handleSubmit}>submit</SubmitButton>
      </Card>
			<Results />
    </PageContainer>
  )
}

export default Search
