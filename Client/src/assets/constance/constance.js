import logo from "../images/logo.svg";
import gmail_logo from "../images/gmail_logo.svg";
import facebook_logo from "../images/facebook_logo.svg";
import instagram_logo from "../images/instagram_logo.svg";
import twitter_logo from "../images/twitter_logo.svg";
import menu_icon from "../images/menu_icon.svg";
import search_icon from "../images/search_icon.svg";
import close_icon from "../images/close_icon.svg";
import users_icon from "../images/users_icon.svg";
import car_icon from "../images/car_icon.svg";
import location_icon from "../images/location_icon.svg";
import fuel_icon from "../images/fuel_icon.svg";
import addIcon from "../images/addIcon.svg";
import carIcon from "../images/carIcon.svg";
import carIconColored from "../images/carIconColored.svg";
import dashboardIcon from "../images/dashboardIcon.svg";
import dashboardIconColored from "../images/dashboardIconColored.svg";
import addIconColored from "../images/addIconColored.svg";
import listIcon from "../images/listIcon.svg";
import listIconColored from "../images/listIconColored.svg";
import cautionIconColored from "../images/cautionIconColored.svg";
import arrow_icon from "../images/arrow_icon.svg";
import star_icon from "../images/star_icon.svg";
import check_icon from "../images/check_icon.svg";
import tick_icon from "../images/tick_icon.svg";
import delete_icon from "../images/delete_icon.svg";
import eye_icon from "../images/eye_icon.svg";
import eye_close_icon from "../images/eye_close_icon.svg";
import filter_icon from "../images/filter_icon.svg";
import edit_icon from "../images/edit_icon.svg";
import calendar_icon_colored from "../images/calendar_icon_colored.svg";
import location_icon_colored from "../images/location_icon_colored.svg";
import testimonials_image_1 from "../images/testimonial_image_1.png";
import testimonial_image_2 from "../images/testimonial_image_2.png";
import main_car from "../images/main_car.png";
import banner_car_image from "../images/banner_car_image.png";
import user_profile from "../images/user_profile.png";
import upload_icon from "../images/upload_icon.svg";
import car_image1 from "../images/car_image1.png";
import car_image2 from "../images/car_image2.png";
import car_image3 from "../images/car_image3.png";
import car_image4 from "../images/car_image4.png";



export const menuLinks = [
  { name: 'Home', path: '/' },
  { name: 'Cars', path: '/cars' },
  {name: 'My bookings', path: '/my-bookings'},
  
];


export const assets = {
    logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_2,
    testimonials_image_1,
    main_car,
    banner_car_image,
    car_image1,
    upload_icon,
    user_profile,
    car_image2,
    car_image3,
    car_image4
    
   
}
export const cityList = [
    "Bangalore",
    "Hyderabad",  
    "Delhi",
    "Mumbai",
    "Chennai",
]


export const cars = [
  {
    id: 1,
    name: "BMW X5",
    year: "SUV 2022",
    seats: 5,
    fuel: "Gasoline",
    type: "Automatic",
    location: "Los Angeles",
    price: 100,
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a",
  },
  {
    id: 2,
    name: "BMW X5",
    year: "SUV 2022",
    seats: 5,
    fuel: "Gasoline",
    type: "Automatic",
    location: "Los Angeles",
    price: 100,
    image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9",
  },
  {
    id: 3,
    name: "BMW X5",
    year: "SUV 2022",
    seats: 5,
    fuel: "Gasoline",
    type: "Automatic",
    location: "Los Angeles",
    price: 100,
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068",
  },
];

export const dummyCarData = [
    {
        "_id": "67ff5bc069c03d4e45f30b77",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "BMW",
        "model": "X5",
        "image": "https://images.unsplash.com/photo-1619767886558-efdc259cde1a",
        "year": 2006,
        "category": "SUV",
        "seating_capacity": 4,
        "fuel_type": "Hybrid",
        "transmission": "Semi-Automatic",
        "pricePerDay": 300,
        "location": "New York",
        "description": "The BMW X5 is a mid-size luxury SUV produced by BMW. The X5 made its debut in 1999 as the first SUV ever produced by BMW.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T07:26:56.215Z",
    },
    {
        "_id": "67ff6b758f1b3684286a2a65",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Toyota",
        "model": "Corolla",
          "image": "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9",
        "year": 2021,
        "category": "Sedan",
        "seating_capacity": 4,
        "fuel_type": "Diesel",
        "transmission": "Manual",
        "pricePerDay": 130,
        "location": "Chicago",
        "description": "The Toyota Corolla is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:33:57.993Z",
    },
    {
        "_id": "67ff6b9f8f1b3684286a2a68",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Jeep ",
        "model": "Wrangler",
        "image": "https://images.unsplash.com/photo-1617531653332-bd46c24f2068",
        "year": 2023,
        "category": "SUV",
        "seating_capacity": 4,
        "fuel_type": "Hybrid",
        "transmission": "Automatic",
        "pricePerDay": 200,
        "location": "Los Angeles",
        "description": "The Jeep Wrangler is a mid-size luxury SUV produced by Jeep. The Wrangler made its debut in 2003 as the first SUV ever produced by Jeep.",
        "isAvaliable": false,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },
    {
        "_id": "68009c93a3f5fc6338ea7e34",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Ford",
        "model": "Neo 6",
        "image": car_image4,
        "year": 2022,
        "category": "Sedan",
        "seating_capacity": 2,
        "fuel_type": "Diesel",
        "transmission": "Semi-Automatic",
        "pricePerDay": 209,
        "location": "Houston",
        "description": "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
        "isAvaliable": true,
        "createdAt": "2025-04-17T06:15:47.318Z",
    }
];

 export  const testimonials = [
        { id: 1, name: "Emma Rodriguez", location: "Barcelona, Spain", image:assets.testimonial_image_2, rating: 5, testimonial: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!" },
        { id: 2, name: "Liam Johnson", location: "New York, USA", image: assets.testimonials_image_1, rating: 4, testimonial: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" },
        { id: 3, name: "Sophia Lee", location: "Seoul, South Korea", image: assets.testimonial_image_2, rating: 5, testimonial: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." }
    ];


// Dummy user data
export const dummyUserData = {
  "_id": "6847f7cab3d8daecdb517095",
  "name": "GreatStack",
  "email": "admin@example.com",
  "role": "owner",
  "image": user_profile,
}



export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add car", path: "/owner/add-car", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Cars", path: "/owner/manage-cars", icon: carIcon, coloredIcon: carIconColored },
    { name: "Manage Bookings", path: "/owner/manage-bookings", icon: listIcon, coloredIcon: listIconColored },
]

export const dummyMyBookingsData = [
    {
        "_id": "68482bcc98eb9722b7751f70",
        "car": dummyCarData[0],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-13",
        "returnDate": "2025-06-14",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T12:57:48.244Z",
    },
    {
        "_id": "68482bb598eb9722b7751f60",
        "car": dummyCarData[1],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-12",
        "returnDate": "2025-06-12",
        "status": "pending",
        "price": 130,
        "createdAt": "2025-06-10T12:57:25.613Z",
    },
    {
        "_id": "684800fa0fb481c5cfd92e56",
        "car": dummyCarData[2],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-11",
        "returnDate": "2025-06-12",
        "status": "pending",
        "price": 600,
        "createdAt": "2025-06-10T09:55:06.379Z",
    },
    {
        "_id": "6847fe790fb481c5cfd92d94",
        "car": dummyCarData[3],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-11",
        "returnDate": "2025-06-12",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T09:44:25.410Z",
    }
]

export const dummyDashboardData = {
  totalCars: 4,
  totalBooking: 2,
  pendingBooking: 0,
  completeBooking: 2,
  recentBooking: [
    dummyMyBookingsData[0],
    dummyMyBookingsData[1],
  ],
  monthlyRevenue: 840,
};
 




