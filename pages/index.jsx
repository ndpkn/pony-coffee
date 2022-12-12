// import styles from '../styles/Home.module.css'
import App from '../components/screens/app/App'

export default function HomePage() {
  return (
    <App/>
  )
}

// export async function getStaticProps() {
//   const res = await fetch('http://localhost:3000/api/userRole')
//   const role = await res.json()
//   return {
//     props: {
//       role,
//     }, // will be passed to the page component as props
//   }
// }
