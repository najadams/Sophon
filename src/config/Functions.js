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

  addCustomer: async ({
    companyId,
    name,
    phone,
    email,
    address,
    company,
    setDone,
    setError,
    setOpen,
    dispatch,
    ActionCreators,
  }) => {
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
        setDone(true);
        setOpen(true);
        dispatch(ActionCreators.addCustomer(customer));
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  },
};