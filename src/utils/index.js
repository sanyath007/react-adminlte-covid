import moment from 'moment';

export const calcAge = (birthday) => {
  const now = moment();
  const birth = moment(birthday, 'YYYY');

  return now.diff(birth, 'years');
};