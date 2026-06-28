// Simple localStorage wrapper — persists resume results + quiz scores
export const Store = {
  set: (key, val) => localStorage.setItem('pa_' + key, JSON.stringify(val)),
  get: (key) => {
    try { return JSON.parse(localStorage.getItem('pa_' + key)) }
    catch { return null }
  },
  clear: () => ['results', 'quizResults'].forEach(k => localStorage.removeItem('pa_' + k))
}