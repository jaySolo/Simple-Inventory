using jsolo.simpleinventory.core.entities;

using NHibernate.Mapping.ByCode;


namespace jsolo.simpleinventory.impl.persistance.mappings;



public class VendorMap : EntityMap<Vendor, int>
{
    public VendorMap() : base("vendors")
    {

        Property(vendor => vendor.CompanyName, map =>
        {
            map.Column("company_name");
        });

        Component(vendor => vendor.ContactPersonName, comp =>
        {
            comp.Property(n => n.Title, compMap => compMap.Column("title"));
            comp.Property(n => n.Surname, compMap => compMap.Column("surname"));
            comp.Property(n => n.FirstName, compMap => compMap.Column("firstname"));
        });

        Property(vendor => vendor.MobilePhoneNumber, map =>
        {
            map.Length(50);
            map.Column("mobile_phone_number");
        });

        Property(vendor => vendor.TelephoneNumber, map =>
        {
            map.Length(50);
            map.Column("telephone_number");
        });

        Property(vendor => vendor.FascimileNumber, map =>
        {
            map.Length(50);
            map.Column("fax_phone_number");
        });

        Property(vendor => vendor.EmailAddress, map =>
        {
            map.Length(200);
            map.Column("email_address");
            // map.NotNullable(false);
        });

        Property(vendor => vendor.PhysicalAddress, map =>
        {
            map.Length(200);
            map.Column("physical_address");
            // map.NotNullable(false);
        });
    }
}
