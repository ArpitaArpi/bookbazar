import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import About from "./pages/About"
import AllBooks from "./pages/AllBooks"
import BookDetails from "./pages/BookDetails"
import Home from "./pages/Home"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}
export default App