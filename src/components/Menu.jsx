import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Paper,
  FormGroup,
  Container,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  Edit as EditIcon,
  LocalPizza as PizzaIcon,
  LocalOffer as OfferIcon,
  Favorite as FavoriteIcon,
  SplitscreenOutlined as SplitIcon,
  LocalFireDepartment as CaloriesIcon,
  FitnessCenter as ProteinIcon,
} from '@mui/icons-material';

const PIZZA_DATA = [
  {
    id: 1,
    name: 'Margherita',
    price: 12.99,
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Basil'],
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800',
    dietary: {
      glutenFree: false,
      vegetarian: true,
      vegan: false
    },
    nutrition: {
      calories: 850,
      protein: 35,
      servingSize: "1 medium pizza (8 slices)"
    }
  },
  {
    id: 2,
    name: 'Pepperoni',
    price: 13.99,
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Pepperoni'],
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800',
    dietary: {
      glutenFree: false,
      vegetarian: false,
      vegan: false
    },
    nutrition: {
      calories: 1050,
      protein: 45,
      servingSize: "1 medium pizza (8 slices)"
    }
  },
  {
    id: 3,
    name: 'Vegetarian Supreme',
    price: 14.99,
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Mushrooms', 'Bell Peppers', 'Onions'],
    image: 'https://images.unsplash.com/photo-1617470703152-7bc3ab20893e?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dietary: {
      glutenFree: false,
      vegetarian: true,
      vegan: false
    },
    nutrition: {
      calories: 780,
      protein: 32,
      servingSize: "1 medium pizza (8 slices)"
    }
  },
  {
    id: 4,
    name: 'Hawaiian',
    price: 15.99,
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Ham', 'Pineapple'],
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800',
    dietary: {
      glutenFree: false,
      vegetarian: false,
      vegan: false
    },
    nutrition: {
      calories: 920,
      protein: 40,
      servingSize: "1 medium pizza (8 slices)"
    }
  },
  {
    id: 5,
    name: 'BBQ Chicken',
    price: 16.99,
    ingredients: ['BBQ Sauce', 'Mozzarella', 'Chicken', 'Red Onions'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    dietary: {
      glutenFree: false,
      vegetarian: false,
      vegan: false
    },
    nutrition: {
      calories: 980,
      protein: 48,
      servingSize: "1 medium pizza (8 slices)"
    }
  },
  {
    id: 6,
    name: 'Vegan Delight',
    price: 17.99,
    ingredients: ['Tomato Sauce', 'Vegan Cheese', 'Mushrooms', 'Bell Peppers', 'Olives'],
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    dietary: {
      glutenFree: true,
      vegetarian: true,
      vegan: true
    },
    nutrition: {
      calories: 720,
      protein: 25,
      servingSize: "1 medium pizza (8 slices)"
    }
  }
];

const EXTRA_INGREDIENTS = [
  { name: 'Mushrooms', price: 1.50 },
  { name: 'Extra Cheese', price: 2.00 },
  { name: 'Corn', price: 1.00 },
  { name: 'Olives', price: 1.50 },
];

const COMBO_DEALS = [
  {
    id: 'combo1',
    name: 'Family Feast',
    description: '2 Large Pizzas + 2 Sides + 2L Drink',
    items: [
      { name: 'Pepperoni Pizza', size: 'Large' },
      { name: 'Margherita Pizza', size: 'Large' },
      { name: 'Garlic Bread', quantity: 1 },
      { name: 'Chicken Wings', quantity: 1 },
      { name: 'Coca Cola', size: '2L' }
    ],
    originalPrice: 55.99,
    discountedPrice: 45.99,
    image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800',
    popular: true
  },
  {
    id: 'combo2',
    name: 'Date Night Special',
    description: '1 Medium Pizza + 1 Side + 2 Desserts',
    items: [
      { name: 'Any Medium Pizza', size: 'Medium' },
      { name: 'Cheesy Bread', quantity: 1 },
      { name: 'Chocolate Brownie', quantity: 2 }
    ],
    originalPrice: 35.99,
    discountedPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=800',
    popular: false
  },
  {
    id: 'combo3',
    name: 'Vegan Bundle',
    description: '1 Large Vegan Pizza + Side Salad + Drink',
    items: [
      { name: 'Vegan Delight Pizza', size: 'Large' },
      { name: 'Garden Salad', quantity: 1 },
      { name: 'Green Smoothie', size: '500ml' }
    ],
    originalPrice: 32.99,
    discountedPrice: 27.99,
    image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=800',
    popular: false
  }
];

const AVAILABLE_TOPPINGS = [
  { name: 'Tomato Sauce', price: 0 },
  { name: 'Mozzarella', price: 1.50 },
  { name: 'Pepperoni', price: 2.00 },
  { name: 'Mushrooms', price: 1.50 },
  { name: 'Bell Peppers', price: 1.00 },
  { name: 'Onions', price: 1.00 },
  { name: 'Olives', price: 1.50 },
  { name: 'Ham', price: 2.00 },
  { name: 'Pineapple', price: 1.50 },
  { name: 'Chicken', price: 2.50 },
  { name: 'Bacon', price: 2.00 },
  { name: 'Extra Cheese', price: 2.00 },
];

const Menu = ({ addToCart }) => {
  const [dietaryFilters, setDietaryFilters] = useState({
    glutenFree: false,
    vegetarian: false,
    vegan: false,
  });
  const [customizingPizza, setCustomizingPizza] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  // Filter pizzas based on search query and dietary preferences
  const filteredPizzas = PIZZA_DATA.filter(pizza => {
    // Search filter
    const searchMatch = pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pizza.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));

    // Dietary filters
    const dietaryMatch = Object.entries(dietaryFilters).every(([filter, isActive]) => {
      return !isActive || pizza.dietary[filter];
    });

    return searchMatch && dietaryMatch;
  });

  const handleCustomize = (pizza) => {
    setCustomizingPizza({
      ...pizza,
      isHalfHalf: false,
      leftHalf: [...pizza.ingredients],
      rightHalf: [...pizza.ingredients],
      addedIngredients: [],
      removedIngredients: [],
      totalPrice: pizza.price,
    });
  };

  const handleToggleHalfHalf = () => {
    if (customizingPizza) {
      setCustomizingPizza(prev => ({
        ...prev,
        isHalfHalf: !prev.isHalfHalf,
        // Reset right half to match left half when toggling off
        rightHalf: !prev.isHalfHalf ? [...prev.leftHalf] : prev.rightHalf
      }));
    }
  };

  const handleAddTopping = (topping, side) => {
    if (!customizingPizza) return;

    setCustomizingPizza(prev => {
      const newPizza = { ...prev };
      
      if (side === 'left' && !prev.leftHalf.includes(topping.name)) {
        newPizza.leftHalf = [...prev.leftHalf, topping.name];
      } else if (side === 'right' && !prev.rightHalf.includes(topping.name)) {
        newPizza.rightHalf = [...prev.rightHalf, topping.name];
      } else if (!side && !prev.leftHalf.includes(topping.name)) {
        // Add to both sides if not half-half
        newPizza.leftHalf = [...prev.leftHalf, topping.name];
        newPizza.rightHalf = [...prev.rightHalf, topping.name];
      }

      return newPizza;
    });
  };

  const handleRemoveTopping = (topping, side) => {
    if (!customizingPizza) return;

    setCustomizingPizza(prev => {
      const newPizza = { ...prev };
      
      if (side === 'left') {
        newPizza.leftHalf = prev.leftHalf.filter(t => t !== topping);
      } else if (side === 'right') {
        newPizza.rightHalf = prev.rightHalf.filter(t => t !== topping);
      } else {
        // Remove from both sides if not half-half
        newPizza.leftHalf = prev.leftHalf.filter(t => t !== topping);
        newPizza.rightHalf = prev.rightHalf.filter(t => t !== topping);
      }

      return newPizza;
    });
  };

  const calculateTotalPrice = (pizza) => {
    if (!pizza) return 0;

    const basePrice = pizza.price;
    let toppingsPrice = 0;

    // If it's a customized pizza
    if (pizza.isHalfHalf) {
      // Calculate unique toppings for each half
      const originalIngredients = pizza.ingredients || [];
      const leftToppings = pizza.leftHalf.filter(t => !originalIngredients.includes(t));
      const rightToppings = pizza.rightHalf.filter(t => !originalIngredients.includes(t));

      leftToppings.forEach(topping => {
        const toppingPrice = AVAILABLE_TOPPINGS.find(t => t.name === topping)?.price || 0;
        toppingsPrice += toppingPrice / 2; // Half price for half pizza
      });

      rightToppings.forEach(topping => {
        const toppingPrice = AVAILABLE_TOPPINGS.find(t => t.name === topping)?.price || 0;
        toppingsPrice += toppingPrice / 2; // Half price for half pizza
      });
    } else if (pizza.addedIngredients) {
      // For non-half-half pizzas with added ingredients
      pizza.addedIngredients.forEach(topping => {
        const toppingPrice = AVAILABLE_TOPPINGS.find(t => t.name === topping)?.price || 0;
        toppingsPrice += toppingPrice;
      });
    }

    return basePrice + toppingsPrice;
  };

  const handleAddToCart = (pizza) => {
    const finalPrice = calculateTotalPrice(pizza);
    addToCart({
      ...pizza,
      totalPrice: finalPrice,
    });
    setCustomizingPizza(null);
  };

  const handleAddComboToCart = (combo) => {
    // You might want to implement a more sophisticated combo handling logic
    addToCart({
      id: combo.id,
      name: combo.name,
      price: combo.discountedPrice,
      isCombo: true,
      items: combo.items,
      totalPrice: combo.discountedPrice,
    });
  };

  return (
    <Box sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
      <Container maxWidth="xl" sx={{ pt: 3, pb: 4 }}>
        {/* Combo Deals Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 3,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            color: theme.palette.primary.main 
          }}>
            <OfferIcon fontSize="large" />
            Special Combos
          </Typography>

          <Grid container spacing={3}>
            {COMBO_DEALS.map((combo) => (
              <Grid item xs={12} md={4} key={combo.id}>
                <Card 
                  elevation={3}
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  {combo.popular && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: -30,
                        transform: 'rotate(45deg)',
                        backgroundColor: 'error.main',
                        color: 'white',
                        px: 4,
                        py: 0.5,
                        zIndex: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        POPULAR
                      </Typography>
                    </Box>
                  )}
                  <CardMedia
                    component="img"
                    height="200"
                    image={combo.image}
                    alt={combo.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      {combo.name}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      gutterBottom
                    >
                      {combo.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {combo.items.map((item, index) => (
                        <Typography 
                          key={index} 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            mb: 0.5 
                          }}
                        >
                          • {item.name} {item.size && `(${item.size})`} 
                          {item.quantity && `x${item.quantity}`}
                        </Typography>
                      ))}
                    </Box>
                    <Box sx={{ 
                      mt: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ 
                          textDecoration: 'line-through',
                          fontSize: '1rem'
                        }}
                      >
                        ${combo.originalPrice.toFixed(2)}
                      </Typography>
                      <Typography 
                        variant="h5" 
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                      >
                        ${combo.discountedPrice.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddComboToCart(combo)}
                      sx={{
                        backgroundColor: theme.palette.success.main,
                        '&:hover': {
                          backgroundColor: theme.palette.success.dark,
                        }
                      }}
                    >
                      Add Combo Deal
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Menu Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 3,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            color: theme.palette.primary.main 
          }}>
            <PizzaIcon fontSize="large" />
            Our Menu
          </Typography>
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormGroup row sx={{ gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dietaryFilters.glutenFree}
                      onChange={(e) => setDietaryFilters(prev => ({
                        ...prev,
                        glutenFree: e.target.checked
                      }))}
                    />
                  }
                  label="Gluten-free"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dietaryFilters.vegetarian}
                      onChange={(e) => setDietaryFilters(prev => ({
                        ...prev,
                        vegetarian: e.target.checked
                      }))}
                    />
                  }
                  label="Vegetarian"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dietaryFilters.vegan}
                      onChange={(e) => setDietaryFilters(prev => ({
                        ...prev,
                        vegan: e.target.checked
                      }))}
                    />
                  }
                  label="Vegan"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search pizzas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
          </Grid>
        </Paper>

        {filteredPizzas.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No pizzas found matching your criteria
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => {
                setSearchQuery('');
                setDietaryFilters({
                  glutenFree: false,
                  vegetarian: false,
                  vegan: false,
                });
              }}
            >
              Clear Filters
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredPizzas.map(pizza => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pizza.id}>
                <Card 
                  elevation={1}
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={pizza.image}
                    alt={pizza.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Box sx={{ mb: 1 }}>
                      {pizza.dietary.glutenFree && (
                        <Chip 
                          label="Gluten-free" 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      )}
                      {pizza.dietary.vegetarian && (
                        <Chip 
                          label="Vegetarian" 
                          size="small" 
                          color="success" 
                          variant="outlined"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      )}
                      {pizza.dietary.vegan && (
                        <Chip 
                          label="Vegan" 
                          size="small" 
                          color="secondary" 
                          variant="outlined"
                          sx={{ mb: 0.5 }}
                        />
                      )}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {pizza.name}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      color="primary" 
                      gutterBottom
                    >
                      ${pizza.price.toFixed(2)}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 2 }}
                    >
                      {pizza.ingredients.join(', ')}
                    </Typography>

                    {/* Nutrition Information */}
                    <Box 
                      sx={{ 
                        display: 'flex',
                        gap: 2,
                        mb: 2,
                        p: 1.5,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 1,
                        alignItems: 'center'
                      }}
                    >
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 0.5,
                          flex: 1
                        }}
                      >
                        <CaloriesIcon 
                          color="error" 
                          fontSize="small"
                        />
                        <Box>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            fontSize="0.75rem"
                          >
                            Calories
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {pizza.nutrition.calories}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Divider orientation="vertical" flexItem />
                      
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 0.5,
                          flex: 1
                        }}
                      >
                        <ProteinIcon 
                          color="primary" 
                          fontSize="small"
                        />
                        <Box>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            fontSize="0.75rem"
                          >
                            Protein
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {pizza.nutrition.protein}g
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      display="block"
                      textAlign="center"
                      sx={{ mb: 2 }}
                    >
                      {pizza.nutrition.servingSize}
                    </Typography>

                    <Box sx={{ 
                      display: 'flex', 
                      gap: 1,
                      mt: 'auto'
                    }}>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleCustomize(pizza)}
                        fullWidth
                      >
                        Customize
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => handleAddToCart({
                          ...pizza,
                          addedIngredients: [],
                          removedIngredients: [],
                        })}
                        fullWidth
                      >
                        Add
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog
          open={Boolean(customizingPizza)}
          onClose={() => setCustomizingPizza(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
            }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">
                Customize Your Pizza
              </Typography>
              <Button
                variant={customizingPizza?.isHalfHalf ? "contained" : "outlined"}
                startIcon={<SplitIcon />}
                onClick={handleToggleHalfHalf}
                color={customizingPizza?.isHalfHalf ? "primary" : "inherit"}
              >
                Half & Half
              </Button>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ 
                  display: 'flex',
                  gap: 2,
                  mb: 3,
                  mt: 1,
                  position: 'relative'
                }}>
                  <Paper 
                    sx={{ 
                      flex: 1,
                      p: 2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05)
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Left Half
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {customizingPizza?.leftHalf.map(topping => (
                        <Chip
                          key={topping}
                          label={topping}
                          onDelete={() => handleRemoveTopping(topping, 'left')}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Paper>
                  {customizingPizza?.isHalfHalf && (
                    <>
                      <Divider orientation="vertical" flexItem>
                        <Chip label="Split" />
                      </Divider>
                      <Paper 
                        sx={{ 
                          flex: 1,
                          p: 2,
                          backgroundColor: alpha(theme.palette.secondary.main, 0.05)
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Right Half
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {customizingPizza?.rightHalf.map(topping => (
                            <Chip
                              key={topping}
                              label={topping}
                              onDelete={() => handleRemoveTopping(topping, 'right')}
                              color="secondary"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Paper>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Chip label="Available Toppings" />
                </Divider>
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={1}>
                    {AVAILABLE_TOPPINGS.map(topping => (
                      <Grid item xs={6} sm={4} md={3} key={topping.name}>
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          onClick={() => {
                            if (customizingPizza?.isHalfHalf) {
                              // Show a menu to choose which half
                              const side = window.confirm("Add to left half?") ? "left" : "right";
                              handleAddTopping(topping, side);
                            } else {
                              handleAddTopping(topping);
                            }
                          }}
                          sx={{ 
                            justifyContent: 'flex-start',
                            textTransform: 'none'
                          }}
                        >
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center'
                          }}>
                            <span>{topping.name}</span>
                            <Chip 
                              label={`$${topping.price.toFixed(2)}`}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCustomizingPizza(null)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleAddToCart({
                  ...customizingPizza,
                  totalPrice: calculateTotalPrice(customizingPizza)
                });
                setCustomizingPizza(null);
              }}
            >
              Add to Cart - ${calculateTotalPrice(customizingPizza).toFixed(2)}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Menu; 