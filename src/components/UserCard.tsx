import { Person } from "@/pages/users";

const UserCard = ({ person }: { person: Person }) => {
  return (
    <>
      <li className="col-span-1 flex flex-col divide-y divide-gray-200 border rounded-lg text-center">
        <div className="flex flex-1 flex-col p-6 gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
            src={person.avatar}
            alt=""
          />
          <div className="text-left grid grid-cols-2 gap-4">
            <div>
              <h3 className="uppercase font-semibold text-sm text-gray-400">
                First Name
              </h3>
              <p>{person.first_name}</p>
            </div>
            <div>
              <h3 className="uppercase font-semibold text-sm text-gray-400">
                Last Name
              </h3>
              <p>{person.last_name}</p>
            </div>
          </div>
          <div className="text-left">
            <h3 className="uppercase font-semibold text-sm text-gray-400">
              Email
            </h3>
            <p>{person.email}</p>
          </div>
        </div>
      </li>
    </>
  );
};

export default UserCard;
