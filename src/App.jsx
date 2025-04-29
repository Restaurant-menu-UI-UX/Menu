import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Layout from './components/Layout'

// Create a custom theme with a warm, appetizing color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#D92D20', // Warm red
      light: '#FEE4E2',
      dark: '#912018',
      contrastText: '#fff',
    },
    secondary: {
      main: '#344054', // Deep gray-blue
      light: '#F2F4F7',
      dark: '#1D2939',
    },
    success: {
      main: '#079455', // Forest green
      light: '#ECFDF3',
      dark: '#05603A',
    },
    error: {
      main: '#F04438',
      light: '#FEE4E2',
      dark: '#912018',
    },
    warning: {
      main: '#F79009',
      light: '#FEF0C7',
      dark: '#93370D',
    },
    info: {
      main: '#3E5F8A',
      light: '#EFF8FF',
      dark: '#1D2939',
    },
    background: {
      default: '#FFFBFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#101828',
      secondary: '#475467',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

function App() {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id)
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      setCartItems(prev => prev.filter(item => item.id !== itemId))
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  const removeItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<Menu addToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={
              <Cart
                items={cartItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
