import express from "express";
import path from "path";

const app = express();

app.use(express.json());

const create_rooms = [
  { id: 1, noOfSeats: 50, amenities: "Projector", pricePerHour: 100 },
  { id: 2, noOfSeats: 30, amenities: "wifi", pricePerHour: 140 },
  { id: 3, noOfSeats: 40, amenities: "parking", pricePerHour: 110 },
];

const BookARoom = [
  {
    bookingStatus: "booked",
    customerName: "david",
    bookingDate: "28.01.2023",
    startTime: "08:00 Am",
    endTime: "10:00 Am",
    roomName: "room1",
  },
  {
    bookingStatus: "booked",
    customerName: "david",
    bookingDate: "29.01.2023",
    startTime: "07:00 Am",
    endTime: "11:00 Am",
    roomName: "room4",
  },
  {
    bookingStatus: "booked",
    customerName: "david",
    dabookingDatete: "29.03.2023",
    startTime: "02:00 Am",
    endTime: "06:00 Am",
    roomName: "room3",
  },
  {
    bookingStatus: "booked",
    customerName: "david",
    bookingDate: "22.01.2023",
    startTime: "12:00 Am",
    endTime: "06:00 pm",
    roomName: "room1",
  },
  {
    bookingStatus: "booked",
    customerName: "david",
    bookingDate: "20.01.2023",
    startTime: "01:00 pm",
    endTime: "07:00 pm",
    roomName: "room2",
  },
  {
    bookingStatus: "booked",
    customerName: "kumar",
    bookingDate: "28.01.2023",
    startTime: "02:00 pm",
    endTime: "10:00 pm",
    roomName: "room1",
  },
  {
    bookingStatus: "booked",
    customerName: "raj",
    bookingDate: "28.01.2023",
    startTime: "04:00 Am",
    endTime: "10:00 Am",
    roomName: "room2",
  },
  {
    customerName: "raj",
    bookingStatus: "booked",
    bookingDate: "16.01.2023",
    startTime: "8:00 Am",
    endTime: "10:00 Am",
    roomName: "room1",
  },
];

//html page that holds the all end points
app.get("/", function (req, res) {
  res.sendFile(path.resolve("public/index.html"));
});

//creating an room

app.post("/create-room", (req, res) => {
  const { noOfSeats, amenities, pricePerHour } = req.body;

  const newID = rooms.length;

  const newData = {
    id: newID,
    noOfSeats,
    amenities,
    pricePerHour,
  };

  create_rooms.push(newData);

  res
    .status(200)
    .json({ messsage: "the room was created successfully", item: newData });
});

// listing the room

app.get("/list-rooms", (req, res) => {
  res.json(create_rooms);
});

//Book a room

app.post("/book-room", (req, res) => {
  const {
    customerName,
    bookingDate,
    bookingStatus,
    startTime,
    endTime,
    roomId,
  } = req.body;

  const newID = BookARoom.length;

  //check the room is available for that particular date and time
  const isRoomAvailable = BookARoom.every((room) => {
    return (
      roomId !== room.roomId ||
      bookingDate !== room.bookingDate ||
      endTime <= room.startTime ||
      startTime >= room.endTime
    );
  });

  if (!isRoomAvailable) {
    return res.status(500).json({
      message: "the room is not available try some other date and time",
    });
  } else {
    const newData = {
      id: newID,
      customerName,
      roomId,
      bookingStatus:
        "booked" /* this is only for the newely created bookings because 
                        the old ones are already stored in an variable so they don't need  
                        while booking if the room was available booking status was automatically
                        updated to Booked thats why*/,

      bookingDate,
      startTime,
      endTime,
    };
    BookARoom.push(newData);
    res.json({
      message: "room created successfully",
      booking: newData,
    });
  }
});

//list rooms

app.get("/list-customers", (req, res) => {
  res.json(BookARoom);
});

//checking how many times a customer has booked the room

app.get("/customer-bookings/:customerName", (req, res) => {
  const { customerName } = req.params;

  const filteredName = BookARoom.find(
    (cust) => cust.customerName == customerName
  );

  const filteredCustomer = BookARoom.filter(
    (cust) => cust.customerName == customerName
  );

  if (filteredName) {
    return res.json({
      name: customerName,
      TotalBookings: filteredCustomer.length,
      detailsOfTheCustomer: filteredCustomer,
    });
  } else {
    res
      .status(404)
      .json(
        `the customer with the name '${customerName} 'has not booked a room before`
      );
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("the server was started in ", PORT);
});
