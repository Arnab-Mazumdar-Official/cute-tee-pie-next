'use client';
import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  MenuItem,
  useTheme,
  CssBaseline,
  Tooltip,
  Stack,
  useMediaQuery,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import axios from "axios";
import { useRouter } from "next/navigation";
import BuildIcon from "@mui/icons-material/Build";
import EventIcon from "@mui/icons-material/Event";




// interface Order {
//   _id: string;
//   size: string;
//   color: string;
//   amount: number;
//   source: string;
//   razorpay_payment_id: string;
//   razorpay_order_id: string;
//   product_details: ProductDetail[];
//   users_details: UserDetail[];
//   address_details: AddressDetail[];
// }

interface order  {
        _id: string,
        razorpay_order_id: string,
        product_id: string,
        user_id:string,
        size: string,
        color: string,
        amount: number,
        quantity: number,
        source: string,
        razorpay_payment_id: string,
        status: string,
        verified: boolean,
        desposition: string,
        created_at: string,
        created_on: number,
        updated_on: number,
        createdAt: string,
        updatedAt: string,
        product_id_obj: string,
        user_id_obj: string,
        product_details: [
          {
            _id: string,
            title:string,
            description: string,
            priority: number,
            active: boolean,
            type: string,
            price: number,
            thumbnail_url: string,
            collectionId: string,
            created_on: number,
            updated_on: number,
            createdAt: string,
            updatedAt:string,
            __v: 0
          }
        ],
        users_details: [
          {
            _id: string,
            name: string,
            email: string,
            phone: string,
            role: string,
            address: string,
            created_on: number,
            updated_on: number,
            state: string,
            city: string,
            zip: number,
            createdAt: string,
            updatedAt: string,
            __v: 0
          }
        ],
        address_details: [
          {
            _id: string,
            shipping_data: {
              first_name: string,
              last_name: string,
              phone_number: number,
              email: string,
              address_secoend: string,
              city: string,
              pincode: number,
              state: string,
              country: string,
              address_first: string
            },
            billinging_data: {
              first_name: string,
              last_name: string,
              phone_number: number,
              email: string,
              address_secoend: string,
              city: string,
              pincode: number,
              state: string,
              country: string,
              address_first: string
            },
            user_id: string,
            selected: boolean,
            created_on: number,
            updated_on: number,
            createdAt: string,
            updatedAt: string,
            __v: 0
          }
        ],
        product_name: string,
        user_name: string
      }


export default function OrderListPage() {
  const theme = useTheme();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [listVisible, setListVisible] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState<order[]>([]);
  const [despositionDialogOpen, setDespositionDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<order | null>(null);
  const [newDesposition, setNewDesposition] = useState('');
  const isAbove716 = useMediaQuery('(min-width:716px)');
  const [loading, setLoading] = useState(false);
  const isMobileView = useMediaQuery('(max-width:1328px)');
  const [deliveryDateDialogOpen, setDeliveryDateDialogOpen] = useState(false);
  const [selectedOrderForDate, setSelectedOrderForDate] = useState<Order | null>(null);
  const [newDeliveryDate, setNewDeliveryDate] = useState<string>('');
  const [snackbar, setSnackbar] = useState<{
      open: boolean;
      message: string;
      severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });


  const [search, setSearch] = useState({
    product: "",
    user: "",
    type: "",
    size: "",
    color: "",
    amount: "",
    paymentId: "",
    orderId: "",
  });

  const [dialogData, setDialogData] = useState(null);
  const [dialogType, setDialogType] = useState(null);

  const openDespositionDialog = (order: order) => {
  setSelectedOrder(order);
  setNewDesposition(order.desposition);
  setDespositionDialogOpen(true);
};


  const handleToggleList = () => {
    if (!apiCalled) {
        setLoading(true);
      axios.get("/api/order-list-for-admin").then((res) => {
        if (res.data.success) {
          setOrders(res.data.data.orders);
          setFilteredOrders(res.data.data.orders);
          setApiCalled(true);
          setLoading(false)
        }else{
            setLoading(false)
        }
      });
    }
    setListVisible((prev) => !prev);
  };

  const handleUpdateDesposition = async () => {
  if (!selectedOrder) return;

  setLoading(true);

  try {
    const response = await fetch('/api/update-desposition', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: selectedOrder._id,
        desposition: newDesposition,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const updatedOrders = filteredOrders.map((order) =>
        order._id === selectedOrder._id
          ? { ...order, desposition: newDesposition }
          : order
      );

      setFilteredOrders(updatedOrders);
      setDespositionDialogOpen(false);

      setSnackbar({
        open: true,
        message: 'Desposition updated successfully!',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: data.error || 'Failed to update desposition.',
        severity: 'error',
      });
    }
  } catch (error) {
    console.error('Error updating desposition:', error);
    setSnackbar({
      open: true,
      message: 'An unexpected error occurred.',
      severity: 'error',
    });
  } finally {
    setLoading(false);
  }
};



const handleUpdateDeliveryDate = async () => {
  if (!selectedOrderForDate) return;

  setLoading(true);

  try {
    const response = await axios.post("/api/update-delivery-date", {
      orderId: selectedOrderForDate._id,
      deliveryDate: newDeliveryDate,
    });

    if (response.status === 200) {
      const updatedOrders = filteredOrders.map((order) =>
        order._id === selectedOrderForDate._id
          ? { ...order, delivery_date: newDeliveryDate }
          : order
      );

      setFilteredOrders(updatedOrders);
      setDeliveryDateDialogOpen(false);

      setSnackbar({
        open: true,
        message: 'Delivery date updated successfully!',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Failed to update delivery date.',
        severity: 'error',
      });
    }
  } catch (error) {
    console.error('Error updating delivery date:', error);
    setSnackbar({
      open: true,
      message: 'An unexpected error occurred.',
      severity: 'error',
    });
  } finally {
    setLoading(false);
  }
};




  const resetFilters = () => {
  setSearch({
    product: "",
    user: "",
    type: "",
    size: "",
    color: "",
    amount: "",
    paymentId: "",
    orderId: "",
  });
  setFilteredOrders(orders);
};

  const handleSearchChange = (field:any) => (e:any) => {
    const value = e.target.value;
    const updatedSearch = { ...search, [field]: value };
    setSearch(updatedSearch);
    const filtered = orders.filter((order) => {
      return (
        order.product_name.toLowerCase().includes(updatedSearch.product.toLowerCase()) &&
        order.user_name.toLowerCase().includes(updatedSearch.user.toLowerCase()) &&
        (updatedSearch.type ? order.source === updatedSearch.type : true) &&
        (updatedSearch.size ? order.size === updatedSearch.size : true) &&
        (updatedSearch.color ? order.color === updatedSearch.color : true) &&
        order.amount.toString().includes(updatedSearch.amount) &&
        order.razorpay_payment_id.toLowerCase().includes(updatedSearch.paymentId.toLowerCase()) &&
        order.razorpay_order_id.toLowerCase().includes(updatedSearch.orderId.toLowerCase())
      );
    });
    setFilteredOrders(filtered);
  };

  const openDeliveryDateDialog = (order: order) => {
  setSelectedOrderForDate(order);
  setNewDeliveryDate(order.delivery_date || ""); // Set to "Not Fixed" if no date
  setDeliveryDateDialogOpen(true);
};


  const handleOpenDialog = (type, row) => {
    setDialogData(row);
    setDialogType(type);
  };

  const handleCloseDialog = () => {
    setDialogData(null);
    setDialogType(null);
  };

  const colorsList = [...new Set(orders.map(o => o.color))];
  const sizesList = [...new Set(orders.map(o => o.size))];

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.mode === "dark" ? "#000" : "#fff", color: theme.palette.mode === "dark" ? "#fff" : "#000" }}>
      {/* <CssBaseline /> */}
      {loading && <LinearProgress />}
      <Stack
        direction={isAbove716 ? 'row' : 'column'}
        spacing={2}
        justifyContent="center"
        mb={3}
        alignItems="center"
      >
        <Button variant="outlined" onClick={() => router.push('/')}>
            Go To User Dashboard
        </Button>
        <Button variant="outlined" onClick={handleToggleList}>
          {listVisible ? 'Hide List' : 'Show List'}
        </Button>
      </Stack>

      {listVisible && (
        <>
          {/* Search Filters */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
            <TextField label="Product Name" size="small" value={search.product} onChange={handleSearchChange("product")} />
            <TextField label="User Name" size="small" value={search.user} onChange={handleSearchChange("user")} />
            <TextField select label="Order Type" size="small" value={search.type} onChange={handleSearchChange("type")} sx={{ minWidth: 150 }}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="one_item">One Item</MenuItem>
                <MenuItem value="multiple_item">Multiple</MenuItem>
            </TextField>
            <TextField select label="Size" size="small" value={search.size} onChange={handleSearchChange("size")} sx={{ minWidth: 100 }}>
                <MenuItem value="">All</MenuItem>
                {sizesList.map(size => <MenuItem key={size} value={size}>{size}</MenuItem>)}
            </TextField>
            <TextField select label="Color" size="small" value={search.color} onChange={handleSearchChange("color")} sx={{ minWidth: 100 }}>
                <MenuItem value="">All</MenuItem>
                {colorsList.map(color => <MenuItem key={color} value={color}>{color}</MenuItem>)}
            </TextField>
            <TextField label="Amount" size="small" value={search.amount} onChange={handleSearchChange("amount")} />
            <TextField label="Payment ID" size="small" value={search.paymentId} onChange={handleSearchChange("paymentId")} />
            <TextField label="Order ID" size="small" value={search.orderId} onChange={handleSearchChange("orderId")} />

            <Button variant="outlined" color="secondary" onClick={resetFilters}>
                Reset
            </Button>
            </Box>


          {/* Table */}
          {isMobileView ? (
  // Card view for mobile (below 1328px)
  <Stack spacing={2}>
    {filteredOrders.map((order) => (
      <Box key={order._id} p={2} border="1px solid #ccc" borderRadius={2}>
        <Typography><strong>Product:</strong> {order.product_name}</Typography>
        <Typography><strong>User:</strong> {order.user_name}</Typography>
        <Typography><strong>Size:</strong> {order.size}</Typography>
        <Typography><strong>Color:</strong> {order.color}</Typography>
        <Typography><strong>Amount:</strong> ₹{order.amount}</Typography>
        <Typography><strong>Type:</strong> {order.source === "one_item" ? "One Item" : "Multiple"}</Typography>
        <Typography><strong>Payment ID:</strong> {order.razorpay_payment_id}</Typography>
        <Typography><strong>Order ID:</strong> {order.razorpay_order_id}</Typography>
        <Typography><strong>Order Desposition:</strong> {order.desposition}</Typography>
        <Typography><strong>Order Delivery date:</strong> {order.delivery_date || "Not Fixed"}</Typography>
        <Box mt={1}>
          <Tooltip title="View Address">
            <IconButton onClick={() => handleOpenDialog("address", order)}>
              <LocalShippingIcon sx={{ color: "#fdd835" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Product">
            <IconButton onClick={() => handleOpenDialog("product", order)}>
              <ShoppingBagIcon sx={{ color: "#f44336" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View User">
            <IconButton onClick={() => handleOpenDialog("user", order)}>
              <PersonIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Update Desposition">
            <IconButton onClick={() => openDespositionDialog(order)}>
              <BuildIcon sx={{ color: "orange" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Change Delivery Date">
                    <IconButton onClick={() => openDeliveryDateDialog(order)}>
                        <EventIcon sx={{ color: "blue" }} />
                    </IconButton>
                    </Tooltip>
        </Box>
      </Box>
    ))}
  </Stack>
        ) : (
        // Normal Table view (above 1328px)
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Payment ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Desposition</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                <TableCell>{order.product_name}</TableCell>
                <TableCell>{order.user_name}</TableCell>
                <TableCell>{order.size}</TableCell>
                <TableCell>{order.color}</TableCell>
                <TableCell>₹{order.amount}</TableCell>
                <TableCell>{order.source === "one_item" ? "One Item" : "Multiple"}</TableCell>
                <TableCell>{order.razorpay_payment_id}</TableCell>
                <TableCell>{order.razorpay_order_id}</TableCell>
                <TableCell>{order.desposition}</TableCell>
                <TableCell>{order.delivery_date || "Not Fixed"}</TableCell>
                <TableCell>
                    <Tooltip title="View Address">
                    <IconButton onClick={() => handleOpenDialog("address", order)}>
                        <LocalShippingIcon sx={{ color: "#fdd835" }} />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="View Product">
                    <IconButton onClick={() => handleOpenDialog("product", order)}>
                        <ShoppingBagIcon sx={{ color: "#f44336" }} />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="View User">
                    <IconButton onClick={() => handleOpenDialog("user", order)}>
                        <PersonIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }} />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Update Desposition">
                    <IconButton onClick={() => openDespositionDialog(order)}>
                        <BuildIcon sx={{ color: "orange" }} />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Change Delivery Date">
                    <IconButton onClick={() => openDeliveryDateDialog(order)}>
                        <EventIcon sx={{ color: "blue" }} />
                    </IconButton>
                    </Tooltip>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        )}


          {/* Dialog */}
          <Dialog open={!!dialogType} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>{dialogType?.toUpperCase()} Details</DialogTitle>
            <DialogContent>
              {dialogType === "address" && (() => {
                const ship = dialogData?.address_details?.[0]?.shipping_data;
                const bill = dialogData?.address_details?.[0]?.billinging_data;
                return (
                  <>
                    <Typography variant="h6">Shipping Address</Typography>
                    <Typography>{ship?.first_name} {ship?.last_name}, {ship?.address_first}, {ship?.address_secoend}, {ship?.city}, {ship?.state}, {ship?.pincode}, {ship?.country}</Typography>
                    <Typography>{ship?.email} | {ship?.phone_number}</Typography>
                    <br />
                    <Typography variant="h6">Billing Address</Typography>
                    <Typography>{bill?.first_name} {bill?.last_name}, {bill?.address_first}, {bill?.address_secoend}, {bill?.city}, {bill?.state}, {bill?.pincode}, {bill?.country}</Typography>
                    <Typography>{bill?.email} | {bill?.phone_number}</Typography>
                  </>
                );
              })()}
              {dialogType === "product" && (() => {
                const p = dialogData?.product_details?.[0];
                return (
                  <>
                    <Typography variant="h6">{p?.title}</Typography>
                    <img src={p?.thumbnail_url} alt="Product" width="100" />
                    <Typography variant="body2">{p?.description}</Typography>
                  </>
                );
              })()}
              {dialogType === "user" && (() => {
                const u = dialogData?.users_details?.[0];
                return (
                  <>
                    <Typography variant="h6">{u?.name}</Typography>
                    <Typography>Email: {u?.email}</Typography>
                    <Typography>Phone: {u?.phone}</Typography>
                    <Typography>Address: {u?.address}, {u?.city}, {u?.state}, {u?.zip}</Typography>
                  </>
                );
              })()}
            </DialogContent>
          </Dialog>
          <Dialog open={despositionDialogOpen} onClose={() => setDespositionDialogOpen(false)}>
            <DialogTitle>Update Desposition</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Desposition</InputLabel>
                <Select
                    value={newDesposition}
                    label="Desposition"
                    onChange={(e) => setNewDesposition(e.target.value)}
                >
                    <MenuItem value="To Be Printed">To Be Printed</MenuItem>
                    <MenuItem value="Printed">Printed</MenuItem>
                    <MenuItem value="Manifested">Manifested</MenuItem>
                    <MenuItem value="Send To Delivery Partner">Send To Delivery Partner</MenuItem>
                    <MenuItem value="shipping">Shipping</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDespositionDialogOpen(false)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleUpdateDesposition}>
                Update
                </Button>
            </DialogActions>
            </Dialog>
            <Dialog open={deliveryDateDialogOpen} onClose={() => setDeliveryDateDialogOpen(false)}>
                <DialogTitle>Update Delivery Date</DialogTitle>
                <DialogContent>
                    <TextField
                    label="Delivery Date"
                    type="date"
                    fullWidth
                    value={newDeliveryDate}
                    onChange={(e) => setNewDeliveryDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeliveryDateDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleUpdateDeliveryDate}>
                    Update
                    </Button>
                </DialogActions>
                </Dialog>


        </>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} variant="filled">{snackbar.message}</Alert>
              </Snackbar>
    </Box>
  );
}
