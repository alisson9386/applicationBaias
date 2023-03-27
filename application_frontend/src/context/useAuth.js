import history from '../history';
import Cookies from 'js-cookie';

class UseAuth {

  handleLogin(data) {
    Cookies.set('token', data.token);
    //localStorage.setItem('token', data.token);
  }

  handleLogout() {
    Cookies.remove('token');
    //localStorage.removeItem('token');
    history.push('/');
  }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UseAuth()