//
//  JsonManager.swift
//  TestSwiftUI
//
//  Created by user164174 on 2/18/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation
import Firebase

public class RemarkDAO {
    
    let rootURL : String = "https://strike-back.herokuapp.com/remarks/"

    //----------------------------------
    //---------- GET requests ----------
    //----------------------------------

    static func getSortedRemarksByDate(order : Int, skip : Int, number : Int) -> [Remark]{
        // Prepare URL
        let preString = "https://strike-back.herokuapp.com/remarks/sorted/date"
        let postString = "?order="+String(order)+"&skip="+String(skip)+"&number="+String(number)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
         
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
        let preString = "https://strike-back.herokuapp.com/remarks/sorted/heard"
        let postString = "?order="+String(order)+"&skip="+String(skip)+"&number="+String(number)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
         
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

    static func getAllUserRemarks() -> [Remark] {
        // Prepare URL
        var currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
        guard let token = currentUser?.authToken else{
            print("No token in user")
            return []
            
        }
        let preString = "https://strike-back.herokuapp.com/remarks/findByUserId"
        let postString = "?token="+String(token)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)

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
                        print("res = " + String(res.count))
                        
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

    static func getRemark(remarkId : String) -> Remark?{
        // Prepare URL
        let preString = "https://strike-back.herokuapp.com/remarks/"
        let postString = "?id="+String(remarkId)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)

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
    
    //search remarks by string
    static func getResearch(research : String) -> [Remark]{
        // Prepare URL
        let preString = "https://strike-back.herokuapp.com/remarks/find"
        let postString = "?search="+research
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)

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
    
    
    
    static func getRemarksCount() -> Int{
        // Prepare URL
        let preString = "https://strike-back.herokuapp.com/remarks/"
        let postString = "count"
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)

        // Perform HTTP Request
        var res : Int = 0
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                
                // Check for Error
                if let error = error {
                    print("Error took place \(error)")
                    return
                }
            
                // Convert HTTP Response Data to a String
                if let data = data{
                    
                    do{
                        res = try JSONDecoder().decode(Int.self, from: data)
                        print("Number tot = " + String(res))
                        
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
    //---------- POST requests ---------
    //----------------------------------

    static func addRemark (rem : Remark) -> Bool{
        var remId : String? = nil
        var currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
        guard let token = currentUser?.authToken else{return false}
        // Prepare URL
        let stringurl = "https://strike-back.herokuapp.com/remarks/add?token=" + token
        let url = URL(string: stringurl)//ICI
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
        //print("json : " , String(data : request.httpBody!, encoding: .utf8)!)
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
                    
                    remId = String(jsonString.dropFirst().dropLast())
                    print("new string : " + remId!)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        if let image = rem.image{
            guard let imagedata = image.jpegData(compressionQuality: 0.1) else{
                print("Error while getting data from image")
                return false
            }
            let filename = UUID.init().uuidString
            let uploadref = Storage.storage().reference(withPath: "/images/\(filename).jpeg")
            
            let metadata = StorageMetadata()
            metadata.contentType = "image/jpeg"
            print("POINT1")
            
            
            //uploadtaskt necessary to manage life cycle but not used for now
            let uploadTask = uploadref.putData(imagedata, metadata: metadata){ metadata, error in
              //not used but possible
                guard let metadata = metadata else {
                print("POINT2")
                return
              }
                print("POINT3")
 
              uploadref.downloadURL { (url, error) in
                guard let downloadURL = url else {
                    print("POINT4")
                  return
                }
                print(downloadURL)
                print("POINT5")
                let stringimageurl = "https://strike-back.herokuapp.com/remarks/image?token=" + token
                let url = URL(string: stringimageurl)
                guard let requestUrl = url else { fatalError() }
                // Prepare URL Request Object
                var request = URLRequest(url: requestUrl)
                request.httpMethod = "PUT"
                guard let remId = remId else{fatalError()}
                let json: [String: Any] = ["id": remId,"url": downloadURL.absoluteString ]
                // Set HTTP Request Body
                do {
                    request.httpBody = try JSONSerialization.data(withJSONObject: json)
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
                   
                }
                task.resume()
              }

            
            }
        }else{
            print("imagestring value is nil")
        }
        print("Waiting for upload...")
        
        return res
    }

    

    //----------------------------------
    //---------- PUT requests ----------
    //----------------------------------

    static func addHeard(remarkId : String) -> Bool {
        // Prepare URL
        var currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
        guard let token = currentUser?.authToken else{return false}
        let preString = "https://strike-back.herokuapp.com/remarks/heard"
        let postString = "?id="+String(remarkId) + "&token=" + token
        let url = URL(string: preString+postString)

        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "PUT"

        let semaphore = DispatchSemaphore(value :0)
         
        // Perform HTTP Request
        var res : Bool = false
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            } else {
                let resp = response as? HTTPURLResponse
                res = (resp?.statusCode == 200) //true si on a bien increment le heard
                if let data = data {
                    if let jsonString = String(data: data, encoding: .utf8){
                        print(jsonString)
                    }
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
    
    static func deleteRemark(remid : String) -> Bool{
        // Prepare URL
        var currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
        guard let token = currentUser?.authToken else{return false}
        let stringurl = "https://strike-back.herokuapp.com/remarks/delete?token="+token
        let url = URL(string: stringurl)
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

}
