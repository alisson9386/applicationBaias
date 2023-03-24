import history from '../history';

class UseAuth {

  handleLogin(data) {
    localStorage.setItem('token', data.token);
  }

  handleLogout() {
    localStorage.removeItem('token');
    history.push('/');
  }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UseAuth()