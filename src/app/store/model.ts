export interface GoogleRegisterUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  providerId: string;
  provider: string;
}

export interface GoogleSignInRequest {
  email: string;
  providerId: string;
  provider: string;
  idToken: string;
}

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    country: string;
    emailVerified: number;
    role: string;
  }
  
  export interface BookCategory {
    name: string;
  }
  
  export interface Book {
    id: number;
    title: string;
    longDesc: string;
    bookCategory: BookCategory;
    author: Author;
    isbn: number;
    bookEdition: string;
    numberOfPages: number;
    language: string;
    imageUrl: string;
    bookUrl: string;
    unitPrice: number;
    cargoPrice: number;
    unitsInStock: number;
    sellCount: number;
    isActive: boolean;
  }
  
  export interface BookResponse {
    id: number;
    title: string;
    imageUrl: string;
    author: Author;
    bookUrl: string;
    unitPrice: number;
    cargoPrice: number;
  }
  
  export interface Author {
    name: string;
  }
  
  export interface Authors {
    authors: Author[];
  }
  
  export interface CartItem {
    id: number;
    url: string;
    imageUrl: string;
    title: string;
    price: number;
    amount: number;
    unitsInStock: number;
    author: Author;
  }
  
  export interface Discount {
    discountPercent: number;
    status: number;
  }
  export interface Cart {
    cartItems: Array<CartItem>;
    discount: Discount;
    totalCartPrice: number;
    totalCargoPrice: number;
    totalPrice: number;
  }
  
  export interface Personal {
    shipName: string;
    phone: string;
  }
  
  export interface Shipping {
    shipAddress: string;
    billingAddress: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }
  
  export interface Payment {
    cardOwner: string;
    cardNo: string;
    cardExp: {
      month: string;
      year: string;
    };
    cardCCV: string;
  }
  
  export interface Checkout {
    shipName: string;
    shipAddress: string;
    billingAddress: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  }
  
  export interface OrderItems {
    url: string;
    title: string;
    price: number;
    cargoPrice: number;
    imageUrl: string;
    amount: number;
    category: BookCategory;
    author: Author;
  }
  
  export interface Orders {
    id: number;
    shipName: string;
    shipAddress: string;
    billingAddress: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    totalPrice: number;
    totalCargoPrice: number;
    date: number;
    shipped: number;
    cargoFirm: string;
    trackingNumber: string;
    discount: Discount;
    orderItems: Array<OrderItems>;
  }
  
  
  export interface Showcase {
    newlyAdded: Array<Book>;
    mostSelling: Array<BookResponse>;
    interested: Array<Book>;
  }
  