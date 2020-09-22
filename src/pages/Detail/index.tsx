import React, { ReactElement } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../store'
import { Card, PageContainer } from '../../subcomponents'
import { Redirect } from 'react-router-dom'

const Detail = (): ReactElement => {
  const { detailItem } = useSelector(
    (state: RootState) => ({
      detailItem: state.detailItem
    }),
    shallowEqual
  )

  if (!detailItem) {
    return <Redirect to="/"></Redirect>
  } else {
    const {
      name,
      description,
      stargazers_count,
      language,
      owner: { login }
    } = detailItem as any

    return (
      <PageContainer>
        <Card>
          <p>{name}</p>
          <p>{description}</p>
          <p>{stargazers_count}</p>
          <p>{language}</p>
          <p>{login}</p>
        </Card>
      </PageContainer>
    )
  }
}

export default Detail
