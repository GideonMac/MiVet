USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Products_Update]    Script Date: 11/18/2022 3:12:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Gideon Macapagal
-- Create date: October 20, 2022
-- Description: Get product info by Id.
-- Code Reviewer: Zachary Frappier

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- =============================================

CREATE PROC [dbo].[Products_Update]
			@SKU nvarchar(50)
           ,@Name nvarchar(255)
           ,@Manufacturer nvarchar(100)
           ,@Year int
           ,@Description nvarchar(400)
           ,@Specifications nvarchar(max)
           ,@ProductTypeId int
           ,@VendorId int
           ,@IsVisible bit
           ,@PrimaryImage nvarchar(250)
           ,@UserId int
		   ,@Id int

AS

/*
--------- TEST CODE ----------
DECLARE @SKU nvarchar(50) = '9999E'
        ,@Name nvarchar(255) = 'Antihistamine'
        ,@Manufacturer nvarchar(100) = 'HVC'
        ,@Year int = 2021
        ,@Description nvarchar(400) = 'Test Desc'
        ,@Specifications nvarchar(max) = 'Test Spec'
        ,@ProductTypeId int = 3
        ,@VendorId int = 1
        ,@IsVisible bit = 1
        ,@PrimaryImage nvarchar(250) = 'Test Image'
        ,@UserId int = 87
		,@Id int = 3

EXECUTE dbo.Products_Update
		@SKU 
		,@Name
		,@Manufacturer
		,@Year
		,@Description
		,@Specifications
		,@ProductTypeId
		,@VendorId
		,@IsVisible
		,@PrimaryImage
		,@UserId
		,@Id

SELECT *
FROM dbo.Products
WHERE Id = @Id

*/

BEGIN

DECLARE @DateNow datetime2 = GetUTCDATE();

UPDATE [dbo].[Products]
SET        [SKU] = @SKU
           ,[Name] = @Name
           ,[Manufacturer] = @Manufacturer
           ,[Year] = @Year
           ,[Description] = @Description
           ,[Specifications] = @Specifications
           ,[ProductTypeId] = @ProductTypeId
           ,[VendorId] = @VendorId
           ,[IsVisible] = @IsVisible
           ,[PrimaryImage] = @PrimaryImage
           ,[ModifiedBy] = @UserId
		   ,[DateModified] = @DateNow

WHERE Id = @Id


END
GO
