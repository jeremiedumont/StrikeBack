//
//  UserDAO.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/1/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation

public class UserDAO {

    static func signup (pseudo : String, password : String, email : String, color : String) -> User?{

        return nil
    }
    
    static func deleteUser(idUser : String) -> Bool{

           return false
       }
    
    static func updatePassword (idUser : String, newpassword : String) -> Bool{

           return false
       }
    
    static func updateColor (pseudo : String, color : String) -> Bool{

           return false
       }
    
    static func login (pseudo : String, password : String) -> User?{

           return nil
       }
}
