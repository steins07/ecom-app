import { TagIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: 'sale',
    title: 'Sale',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Sale Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Sale Description',
            type: 'text',
        }),
        defineField({
            name: 'discountedAmount',
            title: 'Discounted Amount',
            type: 'number',
            description: "Discount amount in percentage or fixed value"
        }),
        defineField({
            name: 'couponCode',
            title: 'Coupon Code',
            type: 'string',
        }),
        defineField({
            name: 'validForm',
            title: 'Valid From',
            type: 'datetime',
        }),
        defineField({
            name: 'validUntil',
            title: 'Valid Until',
            type: 'datetime',
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            initialValue: true,
            description: "Toggle the sale on or off"
        })
    ],
    preview: {
        select: {
            title: 'title',
            discountAmount: 'discountedAmount',
            isActive: 'isActive',
            couponCode: 'couponCode',
        },
        prepare(selection) {
            const { title, discountAmount, isActive, couponCode } = selection;
            const status = isActive ? 'Active' : 'Inactive';
            return {
                title,
                subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
            }
        }
    }
})