export default {
  getHiringList: state => state.candidateHiring.filter(item => this.filter.period_from <= item.created_at <= this.filter.period_to)
}
