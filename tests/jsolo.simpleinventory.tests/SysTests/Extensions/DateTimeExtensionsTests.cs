using System;

using Xunit;

using jsolo.simpleinventory.sys.extensions;


namespace jsolo.simpleinventory.tests.SysTests.Extensions
{
    public class DateTimeExtensionsTests
    {
        [Fact]
        public void Test_Get_DateOf_FirstDayOfWeek()
        {
            // arrange
            DateTime sample = new DateTime(2022, 12, 28);   // using Wednesday, Dec. 28, 2022 at inital date
            DateTime expected = new DateTime(2022, 12, 25);    // expected date: Sunday, Dec. 25, 2022

            // act
            DateTime actual = sample.FirstDayOfWeek();

            //assert
            Assert.Equal(expected, actual);
        }

        
        [Fact]
        public void Test_Get_DateOf_LastDayOfWeek()
        {
            // arrange
            DateTime sample = new DateTime(2022, 12, 28);   // using Wednesday, Dec. 28, 2022 at inital date
            DateTime expected = new DateTime(2022, 12, 31);    // expected date: Saturday, Dec. 31, 2022

            // act
            DateTime actual = sample.LastDayOfWeek();

            //assert
            Assert.Equal(expected, actual);
        }

        
        [Fact]
        public void Test_Get_DateOf_FirstDayOfMonth()
        {
            // arrange
            DateTime sample = new DateTime(2022, 12, 28);   // using Wednesday, Dec. 28, 2022 at inital date
            DateTime expected = new DateTime(2022, 12, 1);    // expected date: Thursday, Dec. 25, 2022

            // act
            DateTime actual = sample.FirstDayOfMonth();

            //assert
            Assert.Equal(expected, actual);
        }

        
        [Fact]
        public void Test_Get_DateOf_LastDayOfMonth()
        {
            // arrange
            DateTime sample = new DateTime(2022, 12, 28);   // using Wednesday, Dec. 28, 2022 at inital date
            DateTime expected = new DateTime(2022, 12, 31);    // expected date: Saturday, Dec. 31, 2022

            // act
            DateTime actual = sample.LastDayOfMonth();

            //assert
            Assert.Equal(expected, actual);
        }

        
        [Fact]
        public void Test_Get_DateOf_FirstDayOfNextMonth()
        {
            // arrange
            DateTime sample = new DateTime(2022, 12, 28);   // using Wednesday, Dec. 28, 2022 at inital date
            DateTime expected = new DateTime(2023, 1, 1);    // expected date: Sunday, Jan. 1, 2023

            // act
            DateTime actual = sample.FirstDayOfNextMonth();

            //assert
            Assert.Equal(expected, actual);
        }
    }
}
