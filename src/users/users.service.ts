/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface Users{
    id:number,
    name:string,
    email:string,
    role:"INTERN"|"ENGINEER"|"ADMIN"
}

@Injectable()
export class UsersService {
    private users=[
        {
            "id":1,
            "name":"Zaid",
            "email":"xyz@gmail.com",
            "role":"INTERN"
        },
        {
            "id":2,
            "name":"Qaya",
            "email":"qaya@gmail.com",
            "role":"ENGINEER"
        },
        {
            "id":3,
            "name":"Lamma",
            "email":"lamma@gmail.com",
            "role":"INTERN"
        },{
            "id":4,
            "name":"Koll",
            "email":"koll@gmail.com",
            "role":"ADMIN"
        }
    ]

    findAll(role?:'INTERN'|'ENGINEER'|'ADMIN'){
        if(role){
            const rolesArray= this.users.filter(user=>user.role===role)
            if(rolesArray.length===0)throw new NotFoundException('Role Not Found');
            else return rolesArray;
        }
        return this.users
    }

    findOne(id:number){
        const user=this.users.find(user=>user.id === id)
        if(!user) throw new NotFoundException('User Not Found');
        return user;
    }

    create(createUserDto :CreateUserDto){
        const userByHighestId=[...this.users].sort((a,b)=>b.id-a.id);
        const newUser={
            id:userByHighestId[0].id+1,
            ...createUserDto
        }
        this.users.push(newUser);
        return newUser;
    }

  update(id:number, updateUserDto:UpdateUserDto){
    this.users=this.users.map(user=>{
        if(user.id===id){
            return {...user,...updateUserDto}
        }
        return user
    })
    return this.findOne(id);
  }

  delete(id:number){
    const removedUser=this.findOne(id);
    this.users=this.users.filter(user=>user.id!==id);

    return removedUser;
  }

}
