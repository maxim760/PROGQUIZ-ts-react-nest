import { useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchLoginUser, setAuthStatusNever } from '../../../store/ducks/user/slice';
import { IUserForLogin } from '../../../store/ducks/user/types';
import { useAppDispatch } from '../../../store/store';
type Inputs = {
  email: string;
  password: string;
};
export const useLoginForm = () => {
  const dispatch = useAppDispatch()
 
  const { register, handleSubmit,errors } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });
  const onSubmitForm = (data: IUserForLogin) => dispatch(fetchLoginUser(data));
  return {
    onSubmitForm: handleSubmit(onSubmitForm),
    errors,
    register,
  }
}
