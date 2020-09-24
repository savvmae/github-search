export const getSortedByStars = (searchList: any) => {
  const sortedRepos = [...searchList].sort((firstValue: any, secondValue: any) => {
    return firstValue.stargazers_count - secondValue.stargazers_count
  }).reverse()
  return sortedRepos
}


export const getAvailableLanguages = (searchList: any) => {
  const languages = Array.from(
    new Set(searchList.map((item: any) => item.language).filter(Boolean))
  )
  return languages
}

export const getFilteredByLanguageList = (sortedList: any, filteredLanguage: string) => {
  return [...sortedList].filter(
    (item) => item.language === filteredLanguage
  )
}