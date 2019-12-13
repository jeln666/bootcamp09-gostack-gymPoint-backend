import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { differenceInCalendarYears } from 'date-fns';

import api from '~/services/api';
import history from '~/services/history';

import { addSuccess, failure, loadSuccess } from './actions';

export function* add({ payload }) {
  try {
    const { name, email, birthday, weight, height, user_id } = payload.student;

    const student = {
      name,
      email,
      birthday,
      weight,
      height,
      user_id,
    };

    yield call(api.post, 'students', student);

    yield put(
      addSuccess({
        ...student,
        age: differenceInCalendarYears(new Date(), birthday),
      })
    );

    toast.success('Aluno gravado com sucesso!');
    history.push('/student');
  } catch (error) {
    console.tron.error(error);
    toast.error('Não foi possível adicionar o aluno');
    yield put(failure());
  }
}

export function* update({ payload }) {
  try {
    const {
      id,
      name,
      email,
      birthday,
      weight,
      height,
      user_id,
    } = payload.student;

    const student = {
      name,
      email,
      birthday,
      weight,
      height,
      user_id,
    };

    yield call(api.put, `/students/${id}`, student);

    yield put(
      addSuccess({
        id,
        ...student,
        age: differenceInCalendarYears(new Date(), birthday),
      })
    );

    toast.success('Aluno atualizado com sucesso!');
    history.push('/student');
  } catch (error) {
    console.tron.error(error);
    toast.error('Não foi possível atualizar o aluno');
    yield put(failure());
  }
}

export function* load({ payload }) {
  try {
    console.tron.log(payload);
    console.tron.log(`/students/${payload.student.id}`);
    const response = yield call(api.get, `/students/${payload.student.id}`);

    const student = response.data;

    yield put(
      loadSuccess({
        ...student,
        age: differenceInCalendarYears(new Date(), student.birthday),
      })
    );

    history.push('/student-register');
  } catch (error) {
    console.tron.error(error);
    toast.error('Não foi possível carregar o aluno');
    yield put(failure());
  }
}

export default all([
  takeLatest('@student/ADD_REQUEST', add),
  takeLatest('@student/UPDATE_REQUEST', update),
  takeLatest('@student/LOAD_REQUEST', load),
]);
