import axios from './index'

export const tableActions = {
  fetchCustomers: async (companyId) => {
    try {
      const response = await axios.get(`/api/customers/${companyId}`);
      const data = response.data.customers.map((item, index) => ({
        id: item._id,
        index: index + 1,
        company: item.company,
        name: item.name,
        phone: item.phone,
        email: item.email,
        address: item.address ? item.address : "None",
      }));
      return data;
    } catch (error) {
      throw new Error("Failed to fetch customers");
    }
  },

  fetchProducts: async (companyId) => {
    try {
      const response = await axios.get(`/api/products/${companyId}`);
      const data = response.data.products.map((item, index) => ({
        id: item._id,
        index: index + 1,
        name: item.name,
        costPrice: item.costprice,
        salesPrice: item.salesprice,
        onHand: item.onhand,
      }));
      return data;
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  },

  updateCustomer: async ({ id, name, phone, email, address, company }) => {
    try {
      const customer = await axios.patch(`/api/customer/${id}`, {
        id,
        name,
        phone,
        email,
        address,
        company,
      });
      if (customer.status === 200) {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error.response?.data?.message || "An error occured";
    }
  },

  addCustomer: async ({ companyId, name, phone, email, address, company }) => {
    try {
      const customer = await axios.post(`/api/customer/`, {
        belongsTo: companyId,
        name,
        phone,
        email,
        address,
        company: company,
      });
      if (customer.status === 201) {
        return customer;
      }
    } catch (error) {
      console.log(error);
      return error.response?.data?.message || "An error occurred";
    }
  },

  updateProduct : async ({
    id,
    name,
    costPrice,
    salesPrice,
    onHand,
  }) => {
    try {
      const product = await axios.patch(`/api/product/${id}`, {
        id,
        name,
        costprice: costPrice,
        salesprice: salesPrice,
        onhand: onHand,
      });
      if (product.status === 200) {
        return null;
      }
    } catch (error) {
      console.log(error)
      return error.response?.data?.message || "An error occurred";
    }
  },

 addProduct : async ({ companyId, name, costPrice, salesPrice, onHand }) => {
    try {
      const product = await axios.post(`/api/product/`, {
        companyId,
        name,
        costprice: costPrice,
        salesprice: salesPrice,
        onhand: onHand,
      });
      if (product.status === 201) {
        return product;
      }
    } catch (error) {
      console.log(error)
      return error.response?.data?.message || "An error occurred";
    }
  },

};