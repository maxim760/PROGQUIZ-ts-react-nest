import { Button, Divider, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectQuiz } from '../../../store/ducks/quiz/selectors'
import { setProgressTest } from '../../../store/ducks/quiz/slice'
import { useAppDispatch } from '../../../store/store'
import { finishWord } from '../../../utils/finishWord'


export const Start: React.FC = (): React.ReactElement | null => {
  const dispatch = useAppDispatch()
  const onStart = () => dispatch(setProgressTest())
  const {title, description, length, category} = useSelector(selectQuiz)!
  return (
    <>
      <Typography className="test__question">{category}: { title }</Typography>
      <Typography className="test__info">Тест включает в себя {length} вопрос{ finishWord(length, ["", "а", "ов"]) }</Typography>
      <Divider />
      <Typography className="test__description">{ description }</Typography>
      <Button onClick={onStart} className="test__start-btn" variant="contained" color={"primary"}>Начать тест</Button>

    </>
  )
}