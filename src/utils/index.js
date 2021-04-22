import moment from 'moment';

export const calcAge = (birthday) => {
  const now = moment();
  const birth = moment(birthday, 'YYYY');

  return now.diff(birth, 'years');
};

export const mapHWardToWard = (ward) => {
  switch (ward) {
    case '00':
      return '2';    
    case '05':
      return '3'    
    case '06':
      return '1'
    default:
      break;
  }
};
