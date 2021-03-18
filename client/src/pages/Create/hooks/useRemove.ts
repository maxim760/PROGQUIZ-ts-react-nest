import { removeQuestion } from "../../../store/ducks/create/slice"
import { useAppDispatch } from "../../../store/store"

export const useRemove = (id: string) => {
  const dispatch = useAppDispatch()
  const onRemove = () => dispatch(removeQuestion(id))
  return {
    onRemove
  }
} 