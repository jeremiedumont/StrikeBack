//
//  JsonManager.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/18/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation

class RemarkDAO {
    static func addRemark (rem : Remark) -> Bool{
        // Prepare URL
        let url = URL(string: "https://strike-back.herokuapp.com/remarks/add")//ICI
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "POST"
        let semaphore = DispatchSemaphore(value :0)
        var res : Bool = false
        // Set HTTP Request Body
        do{
            //try  print(JSONSerialization.jsonObject(with: JSONEncoder().encode(rem), options: []))
            //let json = try JSONSerialization.jsonObject(with: JSONEncoder().encode(rem), options: [])
            request.httpBody = try JSONEncoder().encode(rem)
            
        }catch let error {
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
    
    
    static func deleteRemark(remid : String) -> Bool{
        // Prepare URL
        let url = URL(string: "https://jsonplaceholder.typicode.com/todos") // ICI
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "DELETE"
         
        // HTTP Request Parameters which will be sent in HTTP Request Body
        let postString = "id="+remid;
        // Set HTTP Request Body
        request.httpBody = postString.data(using: String.Encoding.utf8);
        var res : Bool = false
        // Perform HTTP Request
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                
                // Check for Error
                if let error = error {
                    print("Error took place \(error)")
                    return
                }
         
                // Convert HTTP Response Data to a String
                                    let resp = response as? HTTPURLResponse
                    res = (resp?.statusCode == 200)
                
        }
        task.resume()
        return res
    }
    
    static func getAllUserRemarks(userId : String) -> [Remark]{
        
    // Prepare URL
    let url = URL(string: "https://jsonplaceholder.typicode.com/todos")
    guard let requestUrl = url else { fatalError() }
    // Prepare URL Request Object
    var request = URLRequest(url: requestUrl)
    request.httpMethod = "GET"
    let semaphore = DispatchSemaphore(value :0)
    // HTTP Request Parameters which will be sent in HTTP Request Body
    let postString = "userId="+userId;
    // Set HTTP Request Body
    request.httpBody = postString.data(using: String.Encoding.utf8);
    // Perform HTTP Request
    var res : [Remark] = []
    let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            }
     
            // Convert HTTP Response Data to a String
            if let data = data{
                do{
                    res = try JSONDecoder().decode([Remark].self, from: data)
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
    static func getRemark(remId : String) -> Remark?{
        // Prepare URL
        let url = URL(string: "https://jsonplaceholder.typicode.com/todos")
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
        // HTTP Request Parameters which will be sent in HTTP Request Body
        let postString = "id="+remId;
        // Set HTTP Request Body
        request.httpBody = postString.data(using: String.Encoding.utf8);
        // Perform HTTP Request
        var res : Remark? = nil
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                
                // Check for Error
                if let error = error {
                    print("Error took place \(error)")
                    return
                }
         
                // Convert HTTP Response Data to a String
                if let data = data{
                    do{
                        res = try JSONDecoder().decode(Remark.self, from: data)
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
    static func getSortedRemarksByDate(order : Int, skip : Int, number : Int) -> [Remark]{
        // Prepare URL
        //ICI
        let preString = "https://strike-back.herokuapp.com/remarks/sorted/date"
        let postString = "?order="+String(order)+"&skip="+String(skip)+"&number="+String(number)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
         
        // HTTP Request Parameters which will be sent in HTTP Request Body
        
        // Set HTTP Request Body
        //request.httpBody = postString.data(using: String.Encoding.utf8)
        // Perform HTTP Request
        var res : [Remark] = []
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                
                // Check for Error
                if let error = error {
                    print("Error took place \(error)")
                    return
                }
            
                // Convert HTTP Response Data to a String
                if let data = data{
                    
                    do{
                        res = try JSONDecoder().decode([Remark].self, from: data)
                        
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
    static func getSortedRemarksByHeard(order : Int, skip : Int, number : Int) -> [Remark]{
        // Prepare URL
        let url = URL(string: "http://jsonplaceholder.typicode.com/todos")//ICI
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
        // HTTP Request Parameters which will be sent in HTTP Request Body
        let postString = "order=" + String(order) + "&skip=" + String(skip) + "&number=" + String(number)
        // Set HTTP Request Body
        request.httpBody = postString.data(using: String.Encoding.utf8)
        // Perform HTTP Request
        var res : [Remark] = []
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                
                // Check for Error
                if let error = error {
                    print("Error took place \(error)")
                    return
                }
         
                // Convert HTTP Response Data to a String
                if let data = data{
                    do{
                        res = try JSONDecoder().decode([Remark].self, from: data)
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
    static func addHeard(remid : String) -> Bool {
        // Prepare URL
        let url = URL(string: "https://jsonplaceholder.typicode.com/todos")//ICI
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "POST"
         
        // HTTP Request Parameters which will be sent in HTTP Request Body
        let postString = "id" + remid
        // Set HTTP Request Body
        request.httpBody = postString.data(using: String.Encoding.utf8)
        // Perform HTTP Request
        var res : Bool = false
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                
                // Check for Error
                if let error = error {
                    print("Error took place \(error)")
                    return
                }
         
                // Convert HTTP Response Data to a String
                let resp = response as? HTTPURLResponse
                res = (resp?.statusCode == 200)
                
        }
        task.resume()
        return res
    }
}


