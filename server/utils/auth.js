// import decode from 'jwt-decode';

// class AuthService {
//   getProfile() {
//     return decode(this.getToken());
//   }

//   loggedIn() {
//     const token = this.getToken();
//     // If there is a token and it's not expired, return `true`
//     return token && !this.isTokenExpired(token) ? true : false;
//   }

//   isTokenExpired(token) {
//     // Decode the token to get its expiration time that was set by the server
//     const decoded = decode(token);
//     // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
//     if (decoded.exp < Date.now() / 1000) {
//       localStorage.removeItem('id_token');
//       return true;
//     }
//     // If token hasn't passed its expiration time, return `false`
//     return false;
//   }

//   getToken() {
//     return localStorage.getItem('id_token');
//   }

//   login(idToken) {
//     localStorage.setItem('id_token', idToken);
//     window.location.assign('/');
//   }

//   logout() {
//     localStorage.removeItem('id_token');
//     window.location.reload();
//   }
// }

// const Auth = new AuthService()

// export default Auth;


// Update the auth middleware function to work with the GraphQL API
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req }) {
    // allows token to be sent via req.body, req.query, or headers 
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return the request object so it can be passed to the resolver as `context`
    return req
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
