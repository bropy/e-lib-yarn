export const showBookSearchFlag = async (): Promise<boolean> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const hour = new Date().getHours()
    return hour >= 9 && hour <= 21
  } catch (error) {
    console.error('Error checking feature flag:', error)
    return false
  }
}
