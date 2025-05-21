using System;

using Xunit;

using jsolo.simpleinventory.impl.services;
using jsolo.simpleinventory.sys.common.interfaces;


namespace jsolo.simpleinventory.tests.ImplTests.Services
{
    public class DateTimeServiceTests
    {
        [Fact]
        public void Test_DateTime_GetNow()
        {
            // arrange
            IDateTimeService service = new DateTimeService();
            DateTime sample1, sample2;
            
            // act
            DateTime start = DateTime.Now;
            sample1 = service.Now;
            sample2 = service.Now;
            DateTime end = DateTime.Now;

            // assert
            Assert.IsType<DateTime>(sample1);
            Assert.IsType<DateTime>(sample2);

            Assert.True(start < sample1 && sample1 < sample2 && sample2 < end);
        }
    }
}
