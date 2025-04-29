import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Stack,
  Container,
  useTheme,
  alpha
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  ShoppingCart as CartIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SAVED_ADDRESSES = [
  { id: 1, name: 'Home', address: '123 Main St' },
  { id: 2, name: 'Work', address: '456 Office Ave' },
];

const Cart = ({ items, updateQuantity, removeItem }) => {
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
  };

  const deliveryFee = 3.99;
  const taxRate = 0.1;
  const subtotal = calculateSubtotal();
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryFee + tax;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ 
        p: 4,
        backgroundColor: alpha(theme.palette.primary.main, 0.03)
      }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            color: theme.palette.primary.main,
            mb: 4
          }}
        >
          <CartIcon fontSize="large" />
          Your Cart
        </Typography>

        {items.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            color: 'text.secondary'
          }}>
            <Typography variant="h6" gutterBottom>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Browse Menu
            </Button>
          </Box>
        ) : (
          <Stack spacing={3}>
            {items.map(item => (
              <Card 
                key={item.id} 
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <Box>
                      <Typography variant="h6">
                        {item.name}
                      </Typography>
                      {item.customizations && (
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          Left half: {item.customizations.leftHalf.join(', ')}
                          <br />
                          Right half: {item.customizations.rightHalf.join(', ')}
                        </Typography>
                      )}
                      <Typography 
                        variant="h6" 
                        color="primary"
                        sx={{ mt: 1 }}
                      >
                        ${(item.totalPrice * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1 
                    }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography 
                        sx={{ 
                          minWidth: '40px', 
                          textAlign: 'center' 
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: theme.palette.primary.main
              }}>
                <LocationIcon />
                Delivery Address
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Address</InputLabel>
                <Select
                  value={selectedAddress.id}
                  onChange={(e) => setSelectedAddress(
                    SAVED_ADDRESSES.find(addr => addr.id === e.target.value)
                  )}
                  label="Select Address"
                >
                  {SAVED_ADDRESSES.map(addr => (
                    <MenuItem key={addr.id} value={addr.id}>
                      {addr.name}: {addr.address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                fullWidth
                sx={{ mb: 4 }}
              >
                Add New Address
              </Button>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                Special Instructions
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Add any special instructions here..."
                sx={{ mb: 4 }}
              />
            </Box>

            <Box sx={{ 
              backgroundColor: 'white', 
              p: 3, 
              borderRadius: 1 
            }}>
              <Stack spacing={2}>
                <Typography sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between' 
                }}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </Typography>
                <Typography sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between' 
                }}>
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </Typography>
                <Typography sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between' 
                }}>
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </Typography>
                <Divider />
                <Typography variant="h5" sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  color: theme.palette.primary.main,
                  fontWeight: 'bold'
                }}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </Typography>
              </Stack>
            </Box>

            <Stack spacing={2}>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                fullWidth
              >
                Save as Frequent Order
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Proceed to Checkout
              </Button>
            </Stack>
          </Stack>
        )}
      </Paper>
    </Container>
  );
};

export default Cart; 