import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          Prénom
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder="Firdaous"
          autoComplete="first name"
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="last-name" required>
          Nom de famille
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="last-name"
          type="last-name"
          placeholder="Ben Mokhtar"
          autoComplete="last name"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          Adresse de facturation
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder="Nom de rue et numéro"
          autoComplete="shipping address-line1"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">Complément d'adresse</FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="address2"
          placeholder="Appartement, bâtiment, etc. (optionnel)"
          autoComplete="shipping address-line2"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          Ville
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="Montpellier"
          autoComplete="City"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          Département
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder="Hérault"
          autoComplete="State"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="zip" required>
          Code postal
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="34000"
          autoComplete="shipping postal-code"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          Pays
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="country"
          placeholder="France"
          autoComplete="shipping country"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Utiliser cette adresse pour les informations de facturation"
        />
      </FormGrid>
    </Grid>
  );
}