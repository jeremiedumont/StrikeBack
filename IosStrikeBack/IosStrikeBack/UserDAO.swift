//
//  UserDAO.swift
//  Ios StrikeBack
//
//  Created by user164174 on 3/1/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI
import Foundation

public class UserDAO {
    static var currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
    static let rootURL : String = "https://strike-back.herokuapp.com/users/"
    
    //----------------------------------
    //---------- POST requests ---------
    //----------------------------------
    
    /*
     Signup an user
     POST request
     Body:
        pseudo
        password
        Color
        Email
     https://strike-back.herokuapp.com/users/signup

     */
    static func signup (pseudo : String, password : String, email : String, color : String) -> Bool{
        // Prepare URL
        let url = URL(string: UserDAO.rootURL + "signup")
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "POST"
        
        let semaphore = DispatchSemaphore(value :0)
        var res : Bool = false
        print("COLOR" + color)
        //----------------------------------------------------------
        //___________verifier si ca marche de cette facon___________
        //__________________________________________________________
        let json: [String: Any] = ["pseudo": pseudo,"password": password, "email": email, "color": color ]
        // Set HTTP Request Body
        do {
            request.httpBody = try? JSONSerialization.data(withJSONObject: json) 
        } catch let error {
            print(error)
        }
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        print("json : " , String(data : request.httpBody!, encoding: .utf8)!)
        // Perform HTTP Request
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            let resp = response as? HTTPURLResponse
            res = (resp?.statusCode == 200)
            
            if let data = data{
                if let jsonString = String(data: data, encoding: .utf8){
                    print(jsonString)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        return res
    }
    
    /*
     Login an user (verify pseudo and password)
     POST request
     Body:
        pseudo
        password
        autoconnect
    Si autoconnect false, crypt password verify login et password match
    Si autoconnect true, verify login et password match
    -> dans les deux cas renvoi login et password crypté
        
    https://strike-back.herokuapp.com/users/login
     */
    static func login (pseudo : String, password : String, autologin : Bool) -> Bool{
        // Prepare URL
        let url = URL(string: UserDAO.rootURL + "login")
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "POST"
        
        let semaphore = DispatchSemaphore(value :0)
        var res : Bool = false
        //----------------------------------------------------------
        //___________verifier si ca marche de cette facon___________
        //__________________________________________________________
        let json: [String: Any] = ["pseudo": pseudo,"password": password,"autologin": autologin]
        // Set HTTP Request Body
        do {
            request.httpBody = try? JSONSerialization.data(withJSONObject: json)
        } catch let error {
            print(error)
        }
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        print("json : " , String(data : request.httpBody!, encoding: .utf8)!)
        // Perform HTTP Request
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            }
            // Convert HTTP Response Data to a String
            if let data = data{
                do{
                    (UIApplication.shared.delegate as! AppDelegate).currentUser = try JSONDecoder().decode(CurrentUser.self, from: data)
                    res = true
                    if(!autologin){
                        let defaults = UserDefaults.standard
                        defaults.set(pseudo, forKey: "pseudo")
                        defaults.set(currentUser!.password, forKey: "password")
                    }
                }catch let error {
                    print("errorddeded")
                    print(error)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        return res
    }
    /*
     Find an user with his id
     GET request
     Params:
        Id → id de l’user
     https://strike-back.herokuapp.com/users/findById?id=
     */
    static func getUserById(userId : String) -> User?{
        // Prepare URL
        let preString = UserDAO.rootURL + "findById"
        let postString = "?id="+String(userId)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
        
        // Perform HTTP Request
        var res : User? = nil
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            // Convert HTTP Response Data to a String
            if let data = data{
                
                do{
                    res = try JSONDecoder().decode(User.self, from: data)
                    
                }catch let error {
                    print(error)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }
    
    //----------------------------------
    //---------- PUT requests ----------
    //----------------------------------
    
    /*
     Update the password of an user
     PUT request
     Body:
        userId
        oldPassword
        newPassword
     https://strike-back.herokuapp.com/users/updatePassword
     */
    
    static func updatePassword (userId : String, oldPassword : String,  newPassword : String) -> Bool{
        guard let token = currentUser?.authToken else{return false}
        let url = URL(string: UserDAO.rootURL + "updatePassword?token="+token)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "PUT"
        
        let semaphore = DispatchSemaphore(value :0)
        var res : Bool = false
        let code : Int = 0
        let json: [String: Any] = ["userId": userId,"oldPassword": oldPassword, "newPassword": newPassword]
        // Set HTTP Request Body
        do {
            request.httpBody = try? JSONSerialization.data(withJSONObject: json)
        } catch let error {
            print(error)
        }
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        print("json : " , String(data : request.httpBody!, encoding: .utf8)!)
        // Perform HTTP Request
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            let resp = response as? HTTPURLResponse
            if let code = resp?.statusCode{
                
            }
            if(resp?.statusCode == 200){
                res = true
                let defaults = UserDefaults.standard
                defaults.removeObject(forKey: "pseudo")
                defaults.removeObject(forKey: "password")
            }
            
            if let data = data{
                if let jsonString = String(data: data, encoding: .utf8){
                    print(jsonString)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        return res
    }
    /*
     Update the password of an user
     PUT request
     Body:
        userId
        oldPassword
        newPassword
     https://strike-back.herokuapp.com/users/updatePassword
     */
    static func updateColor (userId : String, color : String) -> Bool{
        
        // Prepare URL
        guard let token = currentUser?.authToken else{return false}
        let url = URL(string: UserDAO.rootURL + "updateColor?token="+token)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "PUT"
        
        let semaphore = DispatchSemaphore(value :0)
        var res : Bool = false
        let json: [String: Any] = ["userId": userId,"color": color]
        // Set HTTP Request Body
        do {
            request.httpBody = try? JSONSerialization.data(withJSONObject: json)
        } catch let error {
            print(error)
        }
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        print("json : " , String(data : request.httpBody!, encoding: .utf8)!)
        // Perform HTTP Request
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                print("Error took place \(error)")
                return
            }
            
            let resp = response as? HTTPURLResponse
            res = (resp?.statusCode == 200)
            
            if let data = data{
                if let jsonString = String(data: data, encoding: .utf8){
                    print(jsonString)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        return res
    }
    
    
    //----------------------------------
    //---------- DELETE requests -------
    //----------------------------------
    
    /*
     Delete an user
     DELETE request
     Body:
        userId
        password
     https://strike-back.herokuapp.com/users/delete
     */
 
  /*
    static func deleteUser(userId : String) -> Bool{
        
        return false
    }
    */
}
