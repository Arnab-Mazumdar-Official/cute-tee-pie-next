import React, { useState, forwardRef } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  useTheme,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

// Define Slide transition component with forwardRef
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReferralModal = ({
  open,
  onClose,
  referralCode,
  onGenerateReferral,
}: {
  open: boolean;
  onClose: () => void;
  referralCode?: string;
  onGenerateReferral: (data: {
    referral_payment_method: {
      method: string;
      details: {
        phone_number?: string;
        bank_account_number?: string;
        ifsccode?: string;
      };
    };
  }) => void;
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [method, setMethod] = useState('');
  const [detail, setDetail] = useState('');
  const [ifsc, setIfsc] = useState('');

  const bgColor = isDark ? '#fff' : '#000';
  const textColor = isDark ? '#000' : '#fff';
  const borderColor = textColor;

  const handleGenerate = () => {
  if (!method || !detail) return;

  const payload = {
    referral_payment_method: {
      method,
      details:
        method === 'bank'
          ? {
              bank_account_number: detail,
              ifsccode: ifsc,
            }
          : method === 'upi'
          ? {
              upi_id: detail,
            }
          : {
              phone_number: detail,
            },
    },
  };

  onGenerateReferral(payload);
};


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      TransitionComponent={Transition} // <-- Add transition here
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <Box
        sx={{
          border: `2px solid ${borderColor}`,
          borderRadius: 2,
          backgroundColor: 'transparent',
          p: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: bgColor,
            color: textColor,
            borderRadius: 2,
            width: '100%',
            maxWidth: '500px',
            p: 2,
            backdropFilter: 'none !important',
            WebkitBackdropFilter: 'none !important',
          }}
        >
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              sx={{
                color: '#2196f3',
                background: isDark ? '#000' : '#fff',
                borderRadius: 2,
                height: '37px',
              }}
            >
              Referral Program
            </Typography>

            <Box
              sx={{
                background: isDark ? '#eddede' : '#210000',
                borderRadius: 2,
                p: '10px',
              }}
            >
              <Box sx={{ pl: 1 }}>
                <Typography sx={{ color: '#f44336' }}>
                  • Once you make your first purchase, you become a part of our family — and that’s when your referral code will be unlocked!.
                </Typography>
                <Typography sx={{ color: textColor }}>
                  • Friends get <span style={{ color: isDark ? 'Black' : '#ffeb3b' }}>₹30</span> off using your code for every single product.
                </Typography>
                <Typography sx={{ color: textColor }}>
                  • You earn <span style={{ color: isDark ? 'Black' : '#ffeb3b' }}>₹40</span> per successful referral for every single product.
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ borderColor: borderColor }} />

            <Box
              sx={{
                background: isDark ? '#eddede' : '#210000',
                borderRadius: 2,
                p: '10px',
                mb: 3,
              }}
            >
              {referralCode ? (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: '#2196f3' }}>
                    Your Referral Code:
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ color: isDark ? 'Black' : '#ffeb3b' }}>
                    {referralCode}
                  </Typography>
                </Box>
              ) : (
                <>
                  <Typography fontWeight="bold" sx={{ color: '#2196f3' }}>
                    Choose how you want to receive your rewards:
                  </Typography>

                  <RadioGroup
                    value={method}
                    onChange={(e) => {
                      setMethod(e.target.value);
                      setDetail('');
                    }}
                  >
                    <FormControlLabel value="upi" control={<Radio sx={{ color: borderColor }} />} label="UPI ID" />
                    <FormControlLabel
                      value="wallet"
                      control={<Radio sx={{ color: borderColor }} />}
                      label="GPay / PhonePe / Paytm Number"
                    />
                    <FormControlLabel value="bank" control={<Radio sx={{ color: borderColor }} />} label="Bank Account Number" />
                  </RadioGroup>

                  {method && (
                    <>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={
                          method === 'upi'
                            ? 'Enter UPI ID'
                            : method === 'wallet'
                            ? 'Enter Phone Number'
                            : 'Enter Bank Account Number'
                        }
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        InputProps={{
                          sx: {
                            backgroundColor: isDark ? '#f0f0f0' : '#111',
                            color: textColor,
                            input: { color: textColor },
                          },
                        }}
                        InputLabelProps={{
                          sx: { color: textColor },
                        }}
                      />
                      {method === 'bank' && (
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Enter IFSC Code"
                          value={ifsc}
                          onChange={(e) => setIfsc(e.target.value)}
                          sx={{ mt: 2 }}
                          InputProps={{
                            sx: {
                              backgroundColor: isDark ? '#f0f0f0' : '#111',
                              color: textColor,
                              input: { color: textColor },
                            },
                          }}
                          InputLabelProps={{
                            sx: { color: textColor },
                          }}
                        />
                      )}
                    </>
                  )}

                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: '#ffeb3b',
                      color: '#000',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#fdd835',
                      },
                    }}
                    onClick={handleGenerate}
                    disabled={!method || !detail}
                  >
                    Generate Referral Code
                  </Button>
                </>
              )}
            </Box>
          </DialogContent>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ReferralModal;
