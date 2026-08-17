import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../../assets/E.avif'
import { FaHome, FaMale, FaLayerGroup, FaSearch, FaSearch } from 'react-icons/fa'
import { BiFemale, BiSolidOffer } from 'react-icons/bi'
import { FaChildren } from 'react-icons/fa6'


const MenuData = [
  { name: 'Home', icons: <FaHome />, slug: '/' },
  { name: 'Women', icons: <BiFemale />, slug: '/' },
  { name: 'Men', icons: <FaMale />, slug: '/' },
  { name: 'Kids', icons: <FaChildren />, slug: '/' },
  { name: 'Collection', icons: <FaLayerGroup />, slug: '/' },
  { name: 'Sale', icons: <BiSolidOffer />, slug: '/' },

  // {
  //   Dropdown=[

  //     { name: 'Women', icons: <BiFemale />, slug: '/' },
  //     { name: 'Men', icons: <FaMale />, slug: '/' },
  //     { name: 'Kids', icons: <FaChildren />, slug: '/' },
  //     { name: 'Collection', icons: <FaLayerGroup />, slug: '/' },
  //     { name: 'Sale', icons: <BiSolidOffer />, slug: '/' },
  //   ]
  // }
]

export default function Navbar() {
  return (
    <div>
      <header>
        <nav>

          <img src={logo} alt="ELARA" />
          <h1>ELARA</h1>

          <ul>
            {MenuData.map((item, index) => (
              <li key={index}>
                {item.icons}
                <Link to={item.slug}> {item.name} </Link>
              </li>
            ))}
          </ul>

          <div>
            <FaSearch />
            <input type="text" placeholder='search....' />
          </div>

          <div>
            <button>SignUp</button>
            <button>Login</button>
          </div>
        </nav>
      </header>
    </div>
  )
}
