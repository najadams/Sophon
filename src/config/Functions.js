import axios from './index'

export const tableActions = {
    fetchCustomers : async (companyId) => {
  try {
    const response = await axios.get(`/api/customers/${companyId}`);
    const data = response.data.customers.map((item, index) => ({
      id : item._id,
      index : index + 1,
      company: item.company,
      name: item.name,
      phone : item.phone,
      email: item.email,
      address : item.address ? item.address : 'None'
      
    }));
    return data;
  } catch (error) {
    throw new Error("Failed to fetch customers");
  }
    },
    
  fetchProducts : async (companyId) => {
  try {
    const response = await axios.get(`/api/products/${companyId}`);
    const data = response.data.products.map((item, index) => ({
      id: item._id,
      index : index + 1,
      name: item.name,
      costPrice: item.costprice,
      salesPrice: item.salesprice,
      onHand: item.onhand,
    }));
    return data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}
}