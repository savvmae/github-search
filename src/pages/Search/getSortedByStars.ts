const getSortedByStars = (searchList: any) => {
  const sortedRepos = [...searchList].sort((firstValue: any, secondValue: any) => {
    return firstValue.stargazers_count - secondValue.stargazers_count
  }).reverse()
  return sortedRepos
}

export default getSortedByStars