type IProps = {
  percent: number,
  count: number
}

export const getCountForSuccess = ({ percent, count }: IProps) => {
  return Math.ceil(count * percent)
}