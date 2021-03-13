import { Button, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppAlert, Loader } from '../../components'
import { IResultTest, ResultsApi } from '../../service/ResultsApi'
import { IUser } from '../../store/ducks/user/types'
import { ILoadingStatus } from '../../store/types'
import { ROUTE_NAMES } from '../../utils/routes'
import { Link } from 'react-router-dom'

import { TableStat } from '../Profile/components/TableStat'

import "./result.scss"

interface ResultPageProps {
  
}

export const ResultPage: React.FC<ResultPageProps> = ({ }): React.ReactElement => {
  const {id, user: userId}: {id: string, user: string} = useParams()
  const [user, setUser] = useState<IUser | null>(null)
  const [res, setRes] = useState<IResultTest | null>(null)
  const [status, setStatus] = useState(ILoadingStatus.LOADING)
  const [error, setError] = useState<null | string>(null)
  useEffect(() => {
    const getResultData = async () => {
      try {
        const { user, result } = await ResultsApi.getOneResult({ id, userId })
        setRes(result)
        setUser(user)
        setStatus(ILoadingStatus.SUCCESS)
      } catch (error) {
        setStatus(ILoadingStatus.ERROR)
        setError(error.message)
      }
    }
    getResultData()
  }, [])
  if (status === ILoadingStatus.ERROR) {
    return <AppAlert type="error" text={error || "Ошибка"} />
  }
  if (status === ILoadingStatus.LOADING) {
    return <Loader />
  }
  return (
    <div>
      <Typography>Статистика</Typography>
      <Divider />
      <Typography>Пользователь: {user?.username}</Typography>
      <Typography>Тест: <Link to={ROUTE_NAMES.TEST + res!.quiz._id}><span className="result__link">{res?.quiz.title}</span></Link></Typography>
      <Typography>Все попытки</Typography>
      <div style={{maxWidth: 850, margin: "auto"}}>

      <TableStat stat={res!.stat} successPercent={res!.quiz.successResult} />
      </div>
    </div>
  )
}