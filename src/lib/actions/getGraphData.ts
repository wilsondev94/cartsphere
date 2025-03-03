import prisma from "@/lib/prismaDb";
import moment from "moment";

export default async function getGraphData() {
  try {
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    const results = await prisma.order.groupBy({
      by: ["createdDate"],
      where: {
        createdDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    // Aggregate the data by day with an object
    const aggregateData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    ///////////////////////////////////////////////////////
    //  Create a clone of the startDate to iterate over each day
    const currentDate = startDate.clone();

    // Now iterate
    // const daysArray = Array.from({ length: 7 }, (_, i) =>
    //   startDate.clone().add(i, "days")
    // );

    // daysArray.forEach((date) => {
    //   const day = date.format("dddd");

    //   aggregateData[day] = {
    //     day,
    //     date: date.format("YYYY-MM-DD"),
    //     totalAmount: 0,
    //   };
    // });

    while (currentDate <= endDate) {
      // Format day as a string e.g. Monday...
      const day = currentDate.format("dddd");

      aggregateData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      //   Move to the next day
      currentDate.add(1, "day");
    }
    ////////////////////////////////////////////////////////

    // Calculate the total amount for each day by summing the order amounts
    results.forEach((result) => {
      const day = moment(result.createdDate).format("dddd");
      const amount = result._sum?.amount || 0;

      aggregateData[day].totalAmount += amount;
    });

    // Convert the aggregateData object to an array ad sort it by date
    const formattedData = Object.values(aggregateData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );
    return formattedData;
  } catch (error) {
    console.log(error);
  }
}
