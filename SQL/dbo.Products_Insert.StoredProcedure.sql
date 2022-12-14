USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Products_Insert]    Script Date: 11/18/2022 3:12:16 PM ******/
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

CREATE PROC [dbo].[Products_Insert]
			@SKU nvarchar(50)
           ,@Name nvarchar(255)
           ,@Manufacturer nvarchar(100)
           ,@Year int
           ,@Description nvarchar(400)
           ,@Specifications nvarchar(max)
           ,@ProductTypeId int
           ,@VendorId int
           ,@IsVisible bit
           ,@IsActive bit
           ,@PrimaryImage nvarchar(250)
           ,@UserId int
		   ,@Id int OUTPUT

AS

/*
--------- TEST CODE ----------
DECLARE @SKU nvarchar(50) = '9999F'
        ,@Name nvarchar(255) = 'Antihistamine'
        ,@Manufacturer nvarchar(100) = 'HVC'
        ,@Year int = 2021
        ,@Description nvarchar(400) = 'Test Desc'
        ,@Specifications nvarchar(max) = 'Test Spec'
        ,@ProductTypeId int = 3
        ,@VendorId int = 1
        ,@IsVisible bit = 1
        ,@IsActive bit = 1
        ,@PrimaryImage nvarchar(250) = 'Test Image'
        ,@UserId int = 86
		,@Id int = 0

EXECUTE dbo.Products_Insert 
		@SKU
		,@Name
		,@Manufacturer
		,@Year
		,@Description
		,@Specifications
		,@ProductTypeId
		,@VendorId
		,@IsVisible
		,@IsActive
		,@PrimaryImage
		,@UserId
		,@Id OUTPUT

SELECT *
FROM dbo.Products
WHERE Id = @Id

*/

BEGIN

INSERT INTO [dbo].[Products]
           ([SKU]
           ,[Name]
           ,[Manufacturer]
           ,[Year]
           ,[Description]
           ,[Specifications]
           ,[ProductTypeId]
           ,[VendorId]
           ,[IsVisible]
           ,[IsActive]
           ,[PrimaryImage]
           ,[CreatedBy]
           ,[ModifiedBy])

VALUES (@SKU
		,@Name
		,@Manufacturer
		,@Year
		,@Description
		,@Specifications
		,@ProductTypeId
		,@VendorId
		,@IsVisible
		,@IsActive
		,@PrimaryImage
		,@UserId
		,@UserId)

SET @Id = SCOPE_IDENTITY()

END
GO
