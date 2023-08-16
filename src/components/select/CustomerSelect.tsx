import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

interface Props {
  value: any;
  onChange: (value: any) => void;
  customers: any[];
}

function CustomerSelect({ value, onChange, customers }: Props) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">{value.name}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {customers.map((customer, index) => (
          <DropdownItem
            key={index}
            onClick={() => {
              onChange(customer);
            }}
          >
            {customer.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default CustomerSelect;
