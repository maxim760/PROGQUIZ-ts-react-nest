import { useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { fetchRegisterUser, setAuthStatusNever } from '../../../store/ducks/user/slice';
import { IUserForRegister } from '../../../store/ducks/user/types';
import { useAppDispatch } from '../../../store/store';
import { ROUTE_NAMES } from '../../../utils/routes';

type Inputs = {
  email: string;
  username: string;
  password: string;
  password2: string;
};

export const useRegistrationForm = () => {
  const dispatch = useAppDispatch();
  const history = useHistory()
  const toLogin = () =>  {
    dispatch(setAuthStatusNever())
    history.push(ROUTE_NAMES.LOGIN)

  }
  const {
    register,
    handleSubmit,
    errors,
    watch,
    trigger,
  } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });
  const onComparePasswords = () => {
    watch("password2").length && trigger("password2");
  };

  const onSubmitForm = (data: IUserForRegister) => {
    dispatch(fetchRegisterUser(data));
  };

  return {
    onSubmitForm: handleSubmit(onSubmitForm),
    onComparePasswords,
    watch,
    errors,
    register,
    toLogin
  }

}
