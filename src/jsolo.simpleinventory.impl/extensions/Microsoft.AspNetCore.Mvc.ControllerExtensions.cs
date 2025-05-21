using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Microsoft.AspNetCore.Mvc
{
    [DefaultStatusCode(304)]
    public class NotModifiedObjectResult : ObjectResult
    {
        public NotModifiedObjectResult(/*[ActionResultObjectValue]*/ object value)
            : base(value) { }
    }

    [DefaultStatusCode(304)]
    public class NotModifiedResult : StatusCodeResult
    {
        public NotModifiedResult() : base(304) { }
    }
}