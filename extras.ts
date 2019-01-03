/*
    So you are ready for more?
*/


/*
    ##### Generics #####

    Generics are a way for functions or classes to work with generic data.
    They are mostly used by library authors but you will also find them
    when working with arrays and promises in TypeScript.

    A simple example:

    an array of strings can be written as string[] but also as Array<string>

    Array<string> says that this is an array which can hold strings. 
    All operations which act on values in the array accept or return strings.
*/

const myArray: Array<string> = ['hello', 'world'];

myArray.push('moar'); //works because moar is a string

myArray.push(1); // fails because 1 is not a string

const value = myArray[0];

const value2: number = myArray[0];

/*
    Generics are useful when working with Promises
*/

function doRequest(): Promise<number> {
    // note: there is no generic on the next line.
    // Typescript knows (infers) that doRequest returns a Promise<number>
    return new Promise((resolve) => {
        resolve(1);
    });
}

doRequest().then(value => {
    console.log(value); // value is a number!
});

/*
    You can also create your own functions/ classes which use generics:

    Let's try to create a function that returns a bucket.
    The bucket can contain something (like water, lava or dirt).
    However: if you define a bucket for water then you cannot add lava
*/

function createBucket<Stuff>(initialValue?: Stuff) {
    let content: Stuff[] = [initialValue];

    return {
        add(something: Stuff) {
            content.push(something);
        }
    }
}

const bucket = createBucket<'lava'>();
bucket.add('lava');

bucket.add('water'); // wrong! it's a lava bucket!

/*
    TypeScript can sometimes infer the type of the generic by looking at it's usage
*/

const waterBucket = createBucket({ type: 'water', dirty: false });








/*
    ##### Tagged unions and pattern matching #####

    TypeScript has support for so called union types.
    This is very useful when you have multiple variants of a type.
*/

type UserType = 'admin' | 'editor'; // user can be 'admin' or 'editor'

const newUser: UserType = 'hacker'; // this value is not allowed



/*
    Let's try objects...
*/

type AdminUser = { type: 'admin', email: string, avatar: string };
type EditorUser = { type: 'editor', permissions: string, avatar: string };
type ReadonlyUser = { type: 'readonly', permissions: string };

type User = AdminUser | EditorUser | ReadonlyUser;

// wrong! TypeScript identifies newUser as a AdminUser and AdminUser does not have permissions
const newUserWrong: User = { type: 'admin', permissions: 'all' };

const newAdminUser: User = { type: 'admin', email: 'info@voorhoede.nl', avatar: 'image.jpg' };

/*
    identifing the user type...
*/

/*
    ...we can use a if statement

    hover over the user in each branch to see how the types behave.
*/
function getAvatar(user: User) {
    if(user.type === 'admin') {
        return user.avatar;
    } else if(user.type === 'editor') {
        return user.avatar;
    } else if(user.type === 'readonly') {
        return 'something_else.jpg';
    } else {
        throw new Error('Invalid user');
    }
}

/*
    ...we can use switch statements
*/

function getAvatarSwitch(user: User) {
    switch(user.type) {
        case 'admin':
            return user.avatar;
        case 'editor':
            return user.avatar;
        case 'readonly':
            return 'something_else.jpg';
        default:
            throw new Error('Invalid user');
    }
}

/*
    ...we can use custom type guards
*/

const isAdminUser = (user: User): user is AdminUser => user.type === 'admin';

const user: User = { type: 'admin', avatar: 'avatar.jpg', email: 'mail' };
if(isAdminUser(user)) {
    user.email //notice how the type of user is narrowed down to AdminUser
}