import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { usePassword } from '../../../hooks/usePassword';
import { selectAuthStatus, selectAuthError } from '../../../store/ducks/user/selectors';
import { fetchRegisterUser } from '../../../store/ducks/user/slice';
import { IUserForRegister } from '../../../store/ducks/user/types';
import { useAppDispatch } from '../../../store/store';

type Inputs = {
  email: string;
  username: string;
  password: string;
  password2: string;
};

export const useRegistrationForm = () => {
  const dispatch = useAppDispatch();

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
  }

}
