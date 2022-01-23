// export default function UnauthenticatedRoute({
//   component: C,
//   appProps,
//   ...rest
// }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         !appProps.authenticated ? (
//           <C {...props} {...appProps} />
//         ) : (
//           <Redirect to="/" />
//         )
//       }
//     />
//   );
// }
